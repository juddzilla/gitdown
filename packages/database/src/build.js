import path from 'path';
import Utils from './interfaces/utils';
import RecreateTable from './operations/recreate-table';

export default async function(db, { databaseTablesDir }) {
  console.log('^^^^^^^^ BUILD ^^^^^^^^^^', path.join(process.cwd(), databaseTablesDir));
  const filepaths = await Utils.FindFiles(path.resolve(process.cwd(), databaseTablesDir));
    console.log('filepaths', filepaths);
  const tablesInfo = await Promise.all(filepaths.map(async (handler) => {
    // const absolutePath = path.resolve(process.cwd(), handler);
    console.log('handler', handler);
    const { tableInfo } = await import(handler);
    if (tableInfo) {
      return tableInfo;
    }
    return null;
  }));

  tablesInfo.filter(Boolean).forEach(tableInfo => {
    RecreateTable(db, tableInfo);
  });

  console.log('^^^^^^^^ BUILD ^^^^^^^^^^');
}

