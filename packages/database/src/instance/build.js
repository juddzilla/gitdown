import path from 'path';
import fs from 'fs';

import Utils from '../interfaces/utils.js';
import RecreateTable from '../operations/recreate-table.js';

const defaultSchemasPath = 'packages/database/src/schemas';
export default async function() {
  console.log('^^^^^^^^ BUILD ^^^^^^^^^^');
  // const schemasPath = path.resolve(process.cwd(), directory);
  // if (!fs.existsSync(schemasPath)) {
  //   fs.mkdirSync(schemasPath, { recursive: true });
  //   fs.cpSync(
  //       path.resolve(process.cwd(), defaultSchemasPath),
  //       path.resolve(schemasPath),
  //       { recursive: true },
  //       async (err) => {
  //         if (err) {
  //           console.error(err);
  //         } else {
  //           console.log('success');
  //         }
  //       }
  //   );
  // }

  // if (!fs.existsSync(directory)){
  //   fs.mkdirSync(directory, { recursive: true });
  // }

  let filepaths = await Utils.FindFiles(path.resolve(process.cwd(), defaultSchemasPath, '*.json'));
  const tablesInfo = await Promise.all(filepaths.map(async (handler) => {
    const Path = path.resolve(process.cwd(), handler);
    const tableInfo = await import(Path, { assert: { type: 'json' }});
    return tableInfo.default;
  }));

  tablesInfo.filter(Boolean).forEach(tableInfo => {
    RecreateTable(tableInfo);
  });

  console.log('^^^^^^^^ BUILD ^^^^^^^^^^');
}

