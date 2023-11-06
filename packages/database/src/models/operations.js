import Instance from '../instance/connection';

import {
  keyEqualsOrIn,
  keyEqualsStringArray,
  keyEqualsStringArrayAnd,
  keyInStringArray,
} from '../utils.js';

const createTable = ({ columns, name, unique }) => {
  const DB = Instance();
  const preparedStatement = 'CREATE TABLE IF NOT EXISTS';
  const columnStatements = Object.keys(columns).map(column => [column, columns[column]].join(' '));

  if (unique) {

    const preparedUnique = `UNIQUE(${ unique.join(',') })`;
    columnStatements.push(preparedUnique);
  }

  const preparedColumns = columnStatements.join(',')
  const statement = [preparedStatement, `${name}(`, `${ preparedColumns });`].join(' ');
  const prepared = DB.prepare(statement);

  try {
    prepared.run();
  } catch (err) {
    console.log('Create Table Error', err);
  }
};

export const recreateTable = (tableInfo) => {
  const DB = Instance();
  const { name } = tableInfo;
  const preparedStatement = 'DROP TABLE IF EXISTS';
  const statement = [preparedStatement, name].join(' ');
  const prepared = DB.prepare(statement);

  try {
    prepared.run();
    createTable(tableInfo);
  } catch (error) {
    console.warn('Recreate Table Error', error);
  }
};


const insertInto = (tableName) => `INSERT INTO ${tableName}`;

export const distinctColumn = (tableName, column) => {
  const DB = Instance();
  const statement = `SELECT DISTINCT ${column} FROM ${tableName} ORDER BY ${column} ASC;`;
  const prepared = DB.prepare(statement);
  const results = prepared.all();
  return results.map((result) => result[column]);
};

export const find = (tableName, condition) => {
  const DB = Instance();
  const preparedStatement = `SELECT rowid, * FROM ${tableName} WHERE`;
  const query = keyEqualsStringArrayAnd(condition);

  const statement = [preparedStatement, query].join(' ');
  const prepared = DB.prepare(statement);

  try {
    const executed = prepared.all();
    return executed.length ? executed[0] : false;
  } catch (err) {
    return { error: err.code };
  }
};

export const getMany = (tableName, condition) => {
  const DB = Instance();
  const preparedStatement = `SELECT rowid, * FROM ${tableName}`;
  const parts = [preparedStatement];
  if (condition && Object.keys(condition).length) {
    const query = keyEqualsOrIn(condition).join(' AND ');
    parts.push('WHERE', query)
  }

  const statement = parts.join(' ');

  const prepared = DB.prepare(statement);
  const response = { conditions: condition };

  try {
    const executed = prepared.all();
    response.values = executed;
  } catch (err) {
    response.error = err.code;
  }

  return response;
};

export const getManyForOne = (tableName, one, many) => {
  const DB = Instance();
  const preparedStatement = `SELECT rowid, * FROM ${tableName} WHERE`;
  const oneStatement = keyEqualsStringArray(one);
  const manyStatement = keyInStringArray(many);
  const query = [oneStatement, manyStatement].join(' AND ');
  const statement = [preparedStatement, query].join(' ');
  const prepared = DB.prepare(statement);
  const response = { conditions: { ...one, ...many } };

  try {
    const executed = prepared.all();
    response.values = executed;
  } catch (err) {
    response.error = err.code;
  }

  return response;
};

export const insert = (tableName, data) => {
  const DB = Instance();
  const preparedStatement = insertInto(tableName);
  const keys = Object.keys(data);
  const keysStatement = `(${keys.join(',')})`;
  const values = keys.map((key) => `'${data[key]}'`).join(',');
  const valueStatement = `(${values})`;
  const statement = [preparedStatement, keysStatement, 'VALUES', valueStatement].join(' ');
  const prepared = DB.prepare(statement);
  const response = { data };

  try {
    const executed = prepared.run();
    if (executed.changes) {
      response.rowid = executed.lastInsertRowid;
    } else {
      response.removed = false;
    }
  } catch (err) {
    console.log('error', err);
    response.error = err.code;
  }

  return response;
};

export const insertOneToMany = (tableName, one, many) => {
  const DB = Instance();
  const preparedStatement = insertInto(tableName);
  const keys = Object.keys({ ...one, ...many }).join(',');
  const keysStatement = `(${keys})`;
  const statementParts = [preparedStatement, keysStatement];

  const oneKey = Object.keys(one)[0];
  const oneValue = one[oneKey];

  const manyKey = Object.keys(many)[0];
  const manyValues = Object.values(many[manyKey]);

  return manyValues.reduce((acc, value) => {
    const valueBlock = [oneValue, value].map((v) => `'${v}'`).join(',');
    const valueStatement = `(${valueBlock})`;

    const statement = [...statementParts, 'VALUES', valueStatement].join(' ');

    const prepared = DB.prepare(statement);
    const response = { [manyKey]: value };

    try {
      const executed = prepared.run();

      if (executed.changes) {
        response.rowid = executed.lastInsertRowid;
      } else {
        response.removed = false;
      }
    } catch (err) {
      acc.error = true;
      response.error = err.code;
    }

    acc[manyKey].push(response);
    return acc;
  }, {
    ...one,
    [manyKey]: [],
  });
};

export const removeMany = (tableName, condition) => {
  const DB = Instance();
  const preparedStatement = `DELETE FROM ${tableName} WHERE`;
  const query = keyEqualsOrIn(condition).join(' AND ');
  const statement = [preparedStatement, query].join(' ');

  const prepared = DB.prepare(statement);
  const response = { conditions: condition };

  try {
    const executed = prepared.run();
    response.values = executed;
  } catch (err) {
    response.error = err.code;
  }

  return response;
};

export const update = (tableName, condition, data) => {
  const DB = Instance();
  const preparedStatement = `UPDATE ${tableName} SET`;
  const queryBlocks = [preparedStatement];
  const setBlocks = keyEqualsStringArray(data);
  const conditionBlock = keyEqualsStringArray(condition);
  queryBlocks.push(setBlocks, 'WHERE', conditionBlock);

  const statement = queryBlocks.join(' ');
  const prepared = DB.prepare(statement);
  const response = { condition, data };

  try {
    const executed = prepared.run();

    if (executed.changes) {
      response.rowid = executed.lastInsertRowid;
    } else {
      response.removed = false;
    }
  } catch (err) {
    response.error = err.code;
  }

  return response;
};
