import Base from './base.js';

import Utils from '../interfaces/utils';

export const tableInfo = {
  columns: {
    document_id: 'TEXT',
    tag: 'TEXT',
  },
  name: 'document_tags',
  unique: ['document_id', 'tag'],
};

class DocumentTags extends Base {
  create(documentId, tags) {
    return this.ops.insertOneToMany(tableInfo.name, { document_id: documentId }, { tag: tags });
  }

  delete(documentId) {
    return this.ops.removeMany(tableInfo.name, { document_id: documentId });
  }

  get(documentId) {
    return this.ops.getMany(tableInfo.name, { document_id: documentId });
  }

  remove(documentId, tags) {
    return this.ops.removeMany(tableInfo.name, { document_id: documentId, tag: tags });
  }

  tableInfo() {
    return tableInfo;
  }

  update(documentId, tags) {
    const existingTags = this.get(documentId);
    const compared = Utils.CompareArrays(tags, existingTags.values.map((i) => i.tag));
    const { aNotB, bNotA } = compared;

    if (aNotB.length) {
      this.create(documentId, aNotB);
    }

    if (bNotA.length) {
      this.remove(documentId, bNotA);
    }

    return existingTags;
  }
}

export default new DocumentTags(tableInfo);
