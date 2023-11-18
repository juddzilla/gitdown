import path, { dirname } from 'path';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';

import Utils from '../interfaces/utils.js';
import RecreateTable from '../operations/recreate-table.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default async function() {
  const filesList = path.resolve(__dirname, '../schemas', '*.json');
  let filepaths = await Utils.FindFiles(filesList);
  const tablesInfo = await Promise.all(filepaths.map(async (handler) => {
    const tableInfo = JSON.parse(await readFile(new URL(handler, import.meta.url)));
    return tableInfo;
  }));

  tablesInfo.filter(Boolean).forEach(tableInfo => {
    RecreateTable(tableInfo);
  });
}

