import Database from '../interfaces/database';

export default async (condition) => {
  const results = await Database.Models.Documents.Where(condition);

  return results;
}