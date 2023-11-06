import { readFile } from 'fs/promises';

import Base from './base.js';
import Utils from '../interfaces/utils';
// import tableInfo from '../schemas/document_tags.json' assert { type: 'json' };

const tableInfo = JSON.parse(await readFile(new URL('../schemas/document_tags.json', import.meta.url)));

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
