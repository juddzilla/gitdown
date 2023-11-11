import Database from '../interfaces/database';

export default async (data) => {
  const existing = await Database.Models.Tags.Find(data);
  if (Object.keys(existing).length) {
    return { error: 'Already exists' };
  }
  const created = Database.Models.Tags.Create(data);
  return created;
}