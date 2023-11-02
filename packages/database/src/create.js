import fs from 'fs';
import Database from 'better-sqlite3';

export default async ({databaseLocation, databaseName}) => {
  const dbName = `${databaseName}.db`;
  const dbPath = [databaseLocation, dbName].join('/');

  if (!fs.existsSync(dbPath)){
    fs.mkdirSync(databaseLocation, { recursive: true });
    fs.createWriteStream(dbPath);
  }

  return new Database(dbPath);
}