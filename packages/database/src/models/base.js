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

  Create(data) {
    const preparedStatement = insertInto(this.name);
    const keys = Object.keys(data);
    const keysStatement = `(${keys.join(',')})`;
    const values = keys.map((key) => `'${data[key]}'`).join(',');
    const valueStatement = `(${values})`;
    const statement = [preparedStatement, keysStatement, 'VALUES', valueStatement].join(' ');

    const response = { ...data };

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

  List() {
    const statement = `SELECT rowid, * FROM ${this.name}`;
    // console.log('statement', statement);
    const [err, results] = this.query(statement);

    if (err) {
      return err;
    }

    return results.length ? results : [];
  }

  query(statement) {
    // console.log('!! QUERY !!', statement)
    try {
      const prepared = this.db.prepare(statement);
      const executed = prepared.all();
      // console.log('executed', executed);
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

  async tableSchemaColumns() {
    const filename = `${this.name}.json`;
    // const schema = await import(`../schemas/${filename}`, { assert: { type: "json" }});
    const schema = require(`../schemas/${filename}`);

    if (Object.hasOwn(schema.columns, 'id')) {
      delete schema.columns.id;
    }

    return Object.keys(schema.columns);
  }

  async Update(condition, data) {
    const columns = await this.tableSchemaColumns();
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
    return results.map(result => result[name]);
  }

  Where(condition) {
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
