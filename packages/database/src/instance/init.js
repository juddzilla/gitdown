import configure from '../interfaces/config';
import CreateTables from './build.js';
import { create as CreateDBInstance } from './connection.js';

export default async function() {
  const config = await configure();
  await CreateDBInstance(config)
  await CreateTables();
}
