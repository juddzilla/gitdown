import Database from '../interfaces/database';
import Markdown from './markdown.js';

const handler = async (req, res) => {
  const documents = await Database.Models.Documents.List();
  return res.send(documents);
};

export const route = {
  handler,
  method: 'get',
  name: 'Documents',
  path: '/documents',
};

export default handler;
