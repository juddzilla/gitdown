import path from 'path';
import fs from 'fs';
import Database from 'better-sqlite3';
import configure from '../interfaces/config';
import CreateTables from './build.js';

let DB = null;

export const create = async () => {
  if (DB !== null) {
    return DB;
  }
  const config = await configure();
  const {database, directory} = config;
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

export default async () => {
  if (DB === null) {
    await create();
    await CreateTables();
  }
  return DB;
};
