import Instance from '../instance/connection';

export default async ({ columns, name, unique }) => {
  const DB = await Instance();
  const preparedStatement = 'CREATE TABLE IF NOT EXISTS';
  const columnStatements = Object.keys(columns).map(column => [column, columns[column]].join(' '));

  if (unique) {
    const preparedUnique = `UNIQUE(${ unique.join(',') })`;
    columnStatements.push(preparedUnique);
  }

  const preparedColumns = columnStatements.join(',')
  const statement = [preparedStatement, `${name}(`, `${ preparedColumns });`].join(' ');
  const prepared = DB.prepare(statement);

  try {
    prepared.run();
  } catch (err) {
    console.warn('Create Table Error', err);
  }
};