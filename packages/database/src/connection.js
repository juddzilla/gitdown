import Database from 'better-sqlite3';
import fs from 'fs';

import ENV from './interfaces/env';

// const path = [DATABASE_LOCATION, DATABASE_NAME].filter(Boolean).join('/');
// console.log('path', path);

const databaseName = `${ENV.DATABASE_NAME}.db`;
if (!fs.existsSync(databaseName)){
  fs.createWriteStream(databaseName);
}
console.log('databaseName',databaseName);
const db = new Database(databaseName);

export default db;
