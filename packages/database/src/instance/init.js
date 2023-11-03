import CreateTables from './build.js';
import { create as CreateDBInstance } from './connection.js';

export default async function(config) {
  await CreateDBInstance(config)
  await CreateTables();
}
