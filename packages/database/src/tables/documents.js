import Base from './base.js';

export const tableInfo = {
  columns: {
    id: 'TEXT UNIQUE',
    due: 'INTEGER',
    priority: 'INTEGER',
    project: 'TEXT',
    type: 'TEXT',
    status: 'TEXT',
    updated: 'INTEGER',
  },
  name: 'documents',
};

class Documents extends Base {
  create(data) {
    return this.ops.insert(tableInfo.name, data);
  }

  delete(documentId) {
    return this.ops.removeMany(tableInfo.name, { id: documentId });
  }

  find(documentId) {
    return this.ops.find(tableInfo.name, { id: documentId });
  }

  tableInfo() {
    return tableInfo;
  }

  update(documentId, data) {
    const existingIssue = this.find(documentId);

    if (existingIssue) {
      return this.ops.update(tableInfo.name, { id: documentId }, data);
    }
  }
}

export default new Documents(tableInfo);
