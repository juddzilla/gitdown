import Instance from '../instance/connection';
import {keyEqualsStringArray, keyEqualsStringArrayAnd} from '../utils';
import insertInto from './operations/insert-into.js';

export default class Base {
  constructor(props) {
    const { name } = props;
    this.name = name;
    this.initiate();
  }

  Create(data) {
    const preparedStatement = insertInto(this.name);
    const keys = Object.keys(data);
    const keysStatement = `(${keys.join(',')})`;
    const values = keys.map((key) => `'${data[key]}'`).join(',');
    const valueStatement = `(${values})`;
    const statement = [preparedStatement, keysStatement, 'VALUES', valueStatement].join(' ');
    console.log('pre', this.db);
    const response = { data };

    const [err, results] = this.query(statement);

    if (err) {
      console.log('error', err);
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

    const [err, results] = this.query(statement);

    if (err) {
      return err;
    }

    return results.length? results[0]: {};
  }

  async initiate() {
    this.db = await Instance();
    console.log('base this.sb', this.db);
  }

  List() {
    const statement = `SELECT rowid, * FROM ${this.name}`;
    const [err, results] = this.query(statement);

    if (err) {
      return err;
    }

    console.log('KIST RES', results.length ? results : []);
    return results.length ? results : [];
  }

  query(statement) {
    const prepared = this.db.prepare(statement);

    try {
      const executed = prepared.all();
      console.log('executed', executed);
      return [null, executed];
    } catch (err) {
      return [{ error: err.code }, null];
    }
  }

  Remove(condition) {
    if (!condition || !Object.keys(condition).length) {
      return false;
    }
    const preparedStatement = `DELETE FROM ${this.name} WHERE`;
    const query = keyEqualsStringArrayAnd(condition);

    const statement = [preparedStatement, query, 'RETURNING *'].join(' ');

    const [err, results] = this.query(statement);

    if (err) {
      return err;
    }

    return results.length? results : [];
  }

  Update(condition, data) {
    const preparedStatement = `UPDATE ${this.name} SET`;
    const queryBlocks = [preparedStatement];
    const setBlocks = keyEqualsStringArray(data);
    const conditionBlock = keyEqualsStringArray(condition);
    queryBlocks.push(setBlocks, 'WHERE', conditionBlock);

    const statement = queryBlocks.join(' ');
    const response = { condition, data };

    const [err, results] = this.query(statement);

    if (err) {
      console.log('error', err);
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
}
