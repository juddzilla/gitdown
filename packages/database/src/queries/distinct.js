import Connection from '../connection.js';
const DB = Connection.getInstance();

const map = {
  priority: 'SELECT distinct priority from documents',
  project: 'SELECT distinct project from documents',
  tags: 'SELECT distinct tag AS tags from document_tags',
};

export default function(name) {
  if (Object.hasOwn(map, name)) {
    const statement = map[name];
    const prepared = DB.prepare(statement);
    const results = prepared.all();
    console.log('results', results);
    return results.map(result => result[name]).sort();
  }
}