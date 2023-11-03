import fs from 'fs';
import Database from 'better-sqlite3';

let DB = null;

export const create = async ({database, directory}) => {
  const dbName = `${database}.db`;
  const dbPath = [directory, dbName].join('/');

  if (!fs.existsSync(dbPath)){
    fs.mkdirSync(directory, { recursive: true });
    fs.createWriteStream(dbPath);
  }

  DB = new Database(dbPath);
  return DB;
}

export default () => {
  return DB;
};
