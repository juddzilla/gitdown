import Utils from './interfaces/utils';
import RecreateTable from './operations/recreate-table';

export default async function(directoryStart) {
  console.log('^^^^^^^^ BUILD ^^^^^^^^^^');
  const filepaths = await Utils.FindFiles(directoryStart);
  const tablesInfo = await Promise.all(filepaths.map(async (handler) => {
    const tableInfo = await import(handler, { assert: { type: 'json' }});
    return tableInfo.default;
  }));

  tablesInfo.filter(Boolean).forEach(tableInfo => {
    RecreateTable(tableInfo);
  });

  console.log('^^^^^^^^ BUILD ^^^^^^^^^^');
}

