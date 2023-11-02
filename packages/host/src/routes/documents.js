import Database from '../interfaces/database';

import Markdown from './markdown.js';

const { DocumentPath } = Database.Tables;

const handler = async (req, res) => {
  const { documentId } = req.params;

  if (!documentId) {
    return res.send({ error: 444 });
  }

  const data = DocumentPath.find({ document_id: documentId });
  const { filename, path } = data;

  if (!path) {
    return res.send({ error: 454 });
  }

  const filepath = [path, filename].join('/');
  const md = await Markdown.getFile(filepath);

  return res.send(md);
};

export const route = {
  handler,
  method: 'get',
  name: 'Document',
  path: '/document/:documentId',
};

export default handler;
