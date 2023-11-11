import Database from '../interfaces/database';

export default async ({ tag }) => {
  const documents = await Database.Models.DocumentTags.Where({ tag });
  return documents;
}