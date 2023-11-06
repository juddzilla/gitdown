import path from 'path';
import fs from 'fs';
import Database from 'better-sqlite3';

let DB = null;

export const create = async ({database, directory}) => {
  const dbName = `${database}.db`;
  const dbDirectory = path.resolve('../../', directory);
  const dbPath = path.join(dbDirectory, dbName);

  if (!fs.existsSync(dbDirectory)){
    fs.mkdirSync(dbDirectory, { recursive: true });
    fs.createWriteStream(dbPath);
  }

  DB = new Database(dbPath);
  return DB;
}

export default () => {
  return DB;
};
