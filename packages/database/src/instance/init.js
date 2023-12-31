import configuration from '../interfaces/config';
import CreateTables from './build.js';
import { create as CreateDBInstance } from './connection.js';

let DB = null;

async function Create() {
  const config = await configuration.get();
  const DB = await CreateDBInstance(config)
  await CreateTables();
  return DB;
}

export default async () => {
  if (DB === null) {
    await Create();
  }
  return DB;
}
