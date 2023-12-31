import Base from './base.js';
import Utils from '../interfaces/utils';

import insertInto from './operations/insert-into.js';
import { keyEqualsOrIn } from '../utils';

export default class OneToMany extends Base {
  constructor(props) {
    super(props);
  }

  Create(one, many) {
    const preparedStatement = insertInto(this.name);
    const keys = Object.keys({ ...one, ...many }).join(',');
    const keysStatement = `(${keys})`;
    const statementParts = [preparedStatement, keysStatement];

    const oneKey = Object.keys(one)[0];
    const oneValue = one[oneKey];
    const manyKey = Object.keys(many)[0];
    const manyValues = many[manyKey] ? Object.values(many[manyKey]) : [];

    return manyValues.reduce((acc, value) => {
      const valueBlock = [oneValue, value].map((v) => `'${v}'`).join(',');
      const valueStatement = `(${valueBlock})`;

      const statement = [...statementParts, 'VALUES', valueStatement].join(' ');
      const prepared = this.db.prepare(statement);
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
  }

  Find(condition) {
   return this.List(condition);
  }

  List(condition) {
    const preparedStatement = `SELECT rowid, * FROM ${this.name} WHERE`;
    const query = keyEqualsOrIn(condition).join(' AND ');

    const statement = [preparedStatement, query].join(' ');

    const prepared = this.db.prepare(statement);
    const response = { conditions: condition };

    try {
      const executed = prepared.all();
      response.values = executed;
    } catch (err) {
      response.error = err.code;
    }

    return response;
  }

  Remove(condition) {
    const preparedStatement = `DELETE FROM ${this.name} WHERE`;
    const query = keyEqualsOrIn(condition).join(' AND ');
    const statement = [preparedStatement, query].join(' ');

    const prepared = this.db.prepare(statement);
    const response = { conditions: condition };

    try {
      const executed = prepared.run();
      response.values = executed;
    } catch (err) {
      response.error = err.code;
    }

    return response;
  }

  async Update(documentId, data) {
    const columns = await this.tableSchemaColumns();
    const key = columns.filter(c => c !== 'document_id')[0];
    const existing = this.List(documentId);
    const compared = Utils.CompareArray(data, existing.values.map((i) => i[key]));
    const { aNotB, bNotA } = compared;

    if (aNotB.length) {
      this.Create(documentId, { [key]: aNotB });
    }

    if (bNotA.length) {
      this.Remove({ ...documentId, [key]: bNotA });
    }

    return data;
  }
}