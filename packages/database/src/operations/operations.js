import DB from '../instance/connection.js';

import { keyEqualsOrIn, keyEqualsStringArray, keyInStringArray } from '../utils.js';

const insertInto = (tableName) => `INSERT INTO ${tableName}`;

export const find = (tableName, condition) => {
  const preparedStatement = `SELECT rowid, * FROM ${tableName} WHERE`;
  const query = keyEqualsStringArray(condition);

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
  const preparedStatement = `SELECT rowid, * FROM ${tableName} WHERE`;
  const query = keyEqualsOrIn(condition).join(' AND ');

  const statement = [preparedStatement, query].join(' ');

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
    console.warn('error', err);
    response.error = err.code;
  }

  return response;
};

export const insertOneToMany = (tableName, one, many) => {
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
