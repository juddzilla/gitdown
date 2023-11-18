import path from 'path';
import fs from 'fs';
import Database from 'better-sqlite3';
import configuration from '../interfaces/config';
import CreateTables from './build.js';

let DB = null;

export const create = async () => {
  if (DB !== null) {
    return DB;
  }
  const config = await configuration.get();
  const { database, directory, root } = config;
  const dbName = `${database}.db`;
  const dbPath = path.join(root, directory, dbName);

  if (!fs.existsSync(dbPath)){
    fs.createWriteStream(dbPath);
  }

  DB = new Database(dbPath);
  return DB;
}

export default async (config) => {
  if (DB === null) {
    await create(config);
    await CreateTables();
  }
  return DB;
};
