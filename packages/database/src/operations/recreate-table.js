import CreateTable from './create-table';

export default (DB, tableInfo) => {
  const { name } = tableInfo;
  const preparedStatement = 'DROP TABLE IF EXISTS';
  const statement = [preparedStatement, name].join(' ');
  const prepared = DB.prepare(statement);

  try {
    prepared.run();
    CreateTable(DB, tableInfo);
  } catch (error) {
    console.warn('Recreate Table Error', error);
  }
};