import path from 'path';
import { readFile } from 'fs/promises';

import Utils from '../interfaces/utils.js';
import RecreateTable from '../operations/recreate-table.js';

const defaultSchemasPath = '../database/src/schemas';
export default async function() {
  const filesList = path.resolve(defaultSchemasPath, '*.json');
  let filepaths = await Utils.FindFiles(filesList);
  const tablesInfo = await Promise.all(filepaths.map(async (handler) => {
    const Path = path.resolve(process.cwd(), handler);
    const tableInfo = JSON.parse(await readFile(new URL(Path, import.meta.url)));
    return tableInfo;
  }));

  tablesInfo.filter(Boolean).forEach(tableInfo => {
    RecreateTable(tableInfo);
  });
}

