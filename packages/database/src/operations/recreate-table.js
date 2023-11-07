import Instance from '../instance/connection';

import CreateTable from './create-table';

export default async (tableInfo) => {
  const DB = await Instance();
  const { name } = tableInfo;
  const preparedStatement = 'DROP TABLE IF EXISTS';
  const statement = [preparedStatement, name].join(' ');
  const prepared = DB.prepare(statement);

  try {
    prepared.run();
    CreateTable(tableInfo);
  } catch (error) {
    console.warn('Recreate Table Error', error);
  }
};