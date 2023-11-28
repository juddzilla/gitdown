import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
import Instance from '../instance/connection';
import {
  keyEqualsStringArray,
  keyEqualsStringArrayAnd,
  keyEqualsStringArrayLike,
} from '../utils';
import insertInto from './operations/insert-into.js';

export default class Base {
  constructor(props) {
    const { name } = props;
    this.name = name;
    this.initiate();
  }

  Contains(condition) {
    if (!condition || !Object.keys(condition).length) {
      return this.List();
    }
    const preparedStatement = `SELECT * FROM ${this.name} WHERE`;
    const query = keyEqualsStringArrayLike(condition);

    const statement = [preparedStatement, query].join(' ');

    const [err, results] = this.query(statement);

    if (err) {
      return err;
    }

    return results.length? results : [];
  }

  async Create(data) {
    const keys = await this.tableSchemaColumns();
    console.log('data', this.name, keys);

    // const updateValues = columns.reduce((acc, cur) => {
    //   if (Object.hasOwn(data, cur)) {
    //     acc[cur] = data[cur];
    //   }
    //   return acc;
    // }, {});
    // console.log('columns', columns);
    const preparedStatement = insertInto(this.name);
    // const keys = Object.keys(columns);
    const keysStatement = `(${keys.join(',')})`;
    const values = keys.map((key) => `'${data[key] || ''}'`).join(',');
    const valueStatement = `(${values})`;
    // const valueStatement = keyEqualsStringArray(updateValues);
    const statement = [preparedStatement, keysStatement, 'VALUES', valueStatement].join(' ');
    const response = { ...data };

    console.log('statement', this.name, statement);
    const [err, results] = this.write(statement);

    if (err) {
      console.warn('error', err);
      response.error = err.code;
    } else {
      if (results.changes) {
        response.rowid = results.lastInsertRowid;
      } else {
        response.removed = false;
      }
    }

    return response;
  }

  Distinct(column) {
    const statement = `SELECT distinct ${column} from ${this.name}`;
    const [err, results] = this.query(statement);

    if (err) {
      return err;
    }

    return results.map(result => result[column]).sort();
  }

  Find(condition) {
    const preparedStatement = `SELECT rowid, * FROM ${this.name} WHERE`;
    const query = keyEqualsStringArrayAnd(condition);

    const statement = [preparedStatement, query].join(' ');
    // console.log('STATEMENT', statement);
    const [err, results] = this.query(statement);
    const data = { ...condition };
    // console.log('results', results);
    if (err) {
      return err;
    }

    data.results = results.length ? results[0]: {};
    return data;
  }

  async initiate() {
    this.db = await Instance();
  }

  List(params) {
    const parts = [`SELECT rowid, * FROM ${this.name}`];

    if (params && Object.hasOwn(params, 'order')) {
      parts.push(`ORDER BY ${ params.order } COLLATE NOCASE`);
      delete params.order;
    }

    if (params && Object.hasOwn(params, 'direction')) {
      parts.push(`${ params.direction }`);
      delete params.direction;
    } else {
      parts.push('ASC');
    }

    const where = keyEqualsStringArray(params);

    if (where) {
      parts.push('WHERE', where);
    }

    const statement = parts.filter(Boolean).join(' ');
    const [err, results] = this.query(statement);

    if (err) {
      return err;
    }

    return results.length ? results : [];
  }

  query(statement) {
    try {
      const prepared = this.db.prepare(statement);
      const executed = prepared.all();

      return [null, executed];
    } catch (err) {
      console.warn('err', err);
      return [{ error: err.code }, null];
    }
  }

  Remove(condition) {
    if (!condition || !Object.keys(condition).length) {
      return false;
    }
    const preparedStatement = `DELETE FROM ${this.name} WHERE`;
    const query = keyEqualsStringArrayAnd(condition);

    const statement = [preparedStatement, query].join(' ');
    const [err, results] = this.run(statement);

    if (err) {
      return err;
    }

    return results.length? results : [];
  }

  run(statement) {
    try {
      const prepared = this.db.prepare(statement);
      const executed = prepared.run();
      return [null, executed];
    } catch (err) {
      console.warn('err', err);
      return [{ error: err.code }, null];
    }
  }

  async tableSchemaColumns(noId) {
    const filename = `${this.name}.json`;
    const schema = require(`../schemas/${filename}`);

    if (noId && Object.hasOwn(schema.columns, 'id')) {
      delete schema.columns.id;
    }

    return Object.keys(schema.columns);
  }

  async Update(condition, data) {
    const columns = await this.tableSchemaColumns(true);
    const updateValues = columns.reduce((acc, cur) => {
      if (Object.hasOwn(data, cur)) {
        acc[cur] = data[cur];
      }
      return acc;
    }, {});

    const preparedStatement = `UPDATE ${this.name} SET`;
    const queryBlocks = [preparedStatement];
    const setBlocks = keyEqualsStringArray(updateValues);
    const conditionBlock = keyEqualsStringArray(condition);
    queryBlocks.push(setBlocks, 'WHERE', conditionBlock);

    const statement = queryBlocks.join(' ');
    const response = { condition, data };

    const [err, results] = this.write(statement);

    if (err) {
      console.warn('error', err);
      response.error = err.code;
    } else {
      if (results.changes) {
        response.rowid = results.lastInsertRowid;
      } else {
        response.removed = false;
      }
    }

    return response;
  }

  Unique(name) {
    const map = {
      priority: 'SELECT distinct priority from documents',
      project: 'SELECT distinct project from documents',
      tag: 'SELECT distinct tag from document_tags',
      user_id: 'SELECT distinct user_id from document_users',
    };

    if (!Object.hasOwn(map, name)) {
      return [];
    }

    const [err, results] = this.query(map[name]);

    if (err) {
      return [];
    }
    return results.map(result => result[name].length ? result[name] : '(none)');
  }

  Where(condition) {
    console.log('condition', condition);
    if (!condition || !Object.keys(condition).length) {
      return this.List();
    }
    const preparedStatement = `SELECT * FROM ${this.name} WHERE`;
    const query = keyEqualsStringArrayAnd(condition);

    const statement = [preparedStatement, query].join(' ');

    const [err, results] = this.query(statement);

    const data = { ...condition };

    if (err) {
      return err;
    }

    data.results = results.length ? results : [];
    return data;
  }

  write(statement) {
    const prepared = this.db.prepare(statement);

    try {
      const executed = prepared.run();
      return [null, executed];
    } catch (err) {
      console.warn('err', err);
      return [{ error: err.code }, null];
    }
  }
}
