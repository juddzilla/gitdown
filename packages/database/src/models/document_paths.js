import path from 'path';
import Base from './base.js';
import { readFile } from 'fs/promises';

// import tableInfo from '../schemas/document_paths.json' assert { type: 'json' };
const tableInfo = JSON.parse(await readFile(new URL('../schemas/document_paths.json', import.meta.url)));


import Utils from '../interfaces/utils';

// export const tableInfo = {
//   columns: {
//     document_id: 'TEXT UNIQUE',
//     filename: 'TEXT',
//     path: 'TEXT',
//   },
//   name: 'document_paths',
//   unique: ['filename', 'path'],
// };

class DocumentPaths extends Base {
  create(documentId, filepath) {
    const pathNoCWD = Utils.RelativePath(filepath);
    const parsed = path.parse(pathNoCWD);
    const { base, dir } = parsed;
    return this.ops.insert(tableInfo.name, { document_id: documentId, filename: base, path: dir });
  }

  find(condition) {
    return this.ops.find(tableInfo.name, condition);
  }

  findAndRemove(filepath) {
    const pathNoCWD = Utils.RelativePath(filepath);
    const parsed = path.parse(pathNoCWD);
    const { base, dir } = parsed;
    const existing = this.find({ filename: base, path: dir });

    if (existing) {
      this.ops.removeMany(tableInfo.name, { document_id: existing.document_id });
      return existing.document_id;
    }
    return false;
  }

  tableInfo() {
    return tableInfo;
  }

  update(documentId, filepath) {
    const existingPath = this.find({ document_id: documentId });

    if (!existingPath) {
      return this.create(documentId, filepath);
    }
    const pathNoCWD = Utils.RelativePath(filepath);
    const parsed = path.parse(pathNoCWD);
    const { base, dir } = parsed;

    if (existingPath && pathNoCWD !== [dir, base].join('/')) {
      return this.ops.update(tableInfo.name, { document_id: documentId }, { filename: base, path: dir });
    }
    return false;
  }
}

export default new DocumentPaths(tableInfo);
