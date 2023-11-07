import path from 'path';
import Base from './base.js';
import { readFile } from 'fs/promises';

// import tableInfo from '../schemas/document_paths.json' assert { type: 'json' };
const tableInfo = JSON.parse(await readFile(new URL('../schemas/document_paths.json', import.meta.url)));


import Utils from '../interfaces/utils';

export default class DocumentPaths extends Base {
  constructor(props) {
    super(props);
  }

  Create(documentId, { filepath }) {
    const pathNoCWD = Utils.RelativePath(filepath);
    const parsed = path.parse(pathNoCWD);
    const { base, dir } = parsed;
    return super.Create({ document_id: documentId, filename: base, path: dir });
  }

  FindAndRemove(filepath) {
    const pathNoCWD = Utils.RelativePath(filepath);
    const parsed = path.parse(pathNoCWD);
    const { base, dir } = parsed;
    const existing = super.Find({ filename: base, path: dir });

    if (existing) {
      super.Remove({ document_id: existing.document_id });
      return existing.document_id;
    }
    return false;
  }

  Update(documentId, filepath) {
    const existingPath = super.Find({ document_id: documentId });

    if (!existingPath) {
      return this.Create(documentId, filepath);
    }
    const pathNoCWD = Utils.RelativePath(filepath);
    const parsed = path.parse(pathNoCWD);
    const { base, dir } = parsed;

    if (existingPath && pathNoCWD !== [dir, base].join('/')) {
      return super.Update({ document_id: documentId }, { filename: base, path: dir });
    }
    return false;
  }
}
