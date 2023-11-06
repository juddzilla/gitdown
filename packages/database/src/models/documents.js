import { readFile } from 'fs/promises';
import Base from './base.js';

// import tableInfo from '../schemas/documents.json' assert { type: 'json' };
const tableInfo = JSON.parse(await readFile(new URL('../schemas/documents.json', import.meta.url)));

import DocumentQuery from '../operations/document';
import DistinctColumn from '../operations/distinct-column';

class Documents extends Base {
  create(data) {
    return this.ops.insert(tableInfo.name, data);
  }

  delete(documentId) {
    return this.ops.removeMany(tableInfo.name, { id: documentId });
  }

  find(documentId) {
    const documents = DocumentQuery(documentId)
    return documents[0];
  }

  list() {
    return DocumentQuery();
  }

  project(name) {
    return DistinctColumn('documents', 'project');
  }

  projects() {
    return DistinctColumn('documents', 'project');
  }

  tableInfo() {
    return tableInfo;
  }

  update(documentId, data) {
    const existingIssue = this.find(documentId);

    if (existingIssue) {
      return this.ops.update(tableInfo.name, { id: documentId }, data);
    } else {
      return this.create({id: documentId, ...data});
    }
  }

  Where(data) {
    const response = this.ops.getMany(tableInfo.name, data);
    return response.values;
  }
}

export default new Documents(tableInfo);
