import Database from '../interfaces/database';

import Markdown from './markdown.js';

const handler = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.send({ error: 444 });
  }

  const document = await Database.Models.Documents.find(id);

  if (!document) {
    return res.send({ error: 454 });
  }

  const md = await Markdown.getFile(document.filepath);

  return res.send({ document, md });
};

export const route = {
  handler,
  method: 'get',
  name: 'DocumentById',
  path: '/documents/:id',
};

export default handler;
