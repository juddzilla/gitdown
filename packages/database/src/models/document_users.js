import Base from './base.js';

import Utils from '../interfaces/utils';
import tableInfo from '../schemas/document_users.json' assert { type: 'json' };

// export const tableInfo = {
//   columns: {
//     document_id: 'TEXT',
//     user_id: 'TEXT',
//   },
//   name: 'document_users',
//   unique: ['document_id', 'user_id'],
// };

class DocumentUsers extends Base {
  create(documentId, users) {
    return this.ops.insertOneToMany(
      tableInfo.name,
      { document_id: documentId },
      { user_id: users },
    );
  }

  delete(documentId) {
    return this.ops.removeMany(tableInfo.name, { document_id: documentId });
  }

  get(documentId) {
    return this.ops.getMany(tableInfo.name, { document_id: documentId });
  }

  remove(documentId, users) {
    return this.ops.removeMany(tableInfo.name, { document_id: documentId, user_id: users });
  }

  tableInfo() {
    return tableInfo;
  }

  update(documentId, users) {
    const existingUsers = this.get(documentId);
    const compared = Utils.CompareArrays(users, existingUsers.values.map((i) => i.user_id));
    const { aNotB, bNotA } = compared;

    if (aNotB.length) {
      this.create(documentId, aNotB);
    }

    if (bNotA.length) {
      this.remove(documentId, bNotA);
    }

    return existingUsers;
  }
}

export default new DocumentUsers(tableInfo);
