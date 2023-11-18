import Database from '../interfaces/database.js';

export default async (data) => {
  const [err, results] = await Database.Models.Documents.Search(data);
  if (err) {
    console.warn('SEARCH ERR', err);
    return { results: [] };
  }

  return { results };
};