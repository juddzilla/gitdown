import Database from '../interfaces/database';

import Markdown from './markdown.js';

const { DocumentPath } = Database.Tables;

const handler = async (req, res) => {
  const data = req.body;

  if (!data) {
    return res.send({ error: 400 });
  }

  const { id } = data;

  const document = DocumentPath.find({ document_id: id });
  const { filename, path } = document;
  const filepath = [path, filename].join('/');

  try {
    await Markdown.updateFile(filepath, data);
    return res.send({ success: 100 });
  } catch (e) {
    return res.send({ error: 900 });
  }
};

export const route = {
  handler,
  method: 'put',
  name: 'UpdateMetadata',
  path: '/metadata/:documentId',
};

export default handler;
