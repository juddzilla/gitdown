import Instance from '../instance/connection';

export default (tableName, column) => {
  const DB = Instance();
  const statement = `SELECT DISTINCT ${column} FROM ${tableName} ORDER BY ${column} ASC;`;
  const prepared = DB.prepare(statement);
  const results = prepared.all();
  return results.map((result) => result[column]);
};