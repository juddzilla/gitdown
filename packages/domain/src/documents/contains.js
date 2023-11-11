import Database from '../interfaces/database';

export default async (condition) => {
  const results = await Database.Models.Documents.Contains(condition);

  return {
    ...condition,
    results
  };
}