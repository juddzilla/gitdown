export default (DB, tableName, column) => {
  const statement = `SELECT DISTINCT ${column} FROM ${tableName} ORDER BY ${column} ASC;`;
  const prepared = DB.prepare(statement);
  const results = prepared.all();
  return results.map((result) => result[column]);
};