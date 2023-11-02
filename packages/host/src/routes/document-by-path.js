import Markdown from './markdown.js';

const handler = async (req, res) => {
  const { documentPath } = req.params;

  if (!documentPath) {
    return res.send({ error: 494 });
  }

  const md = await Markdown.getFile(documentPath);
  return res.send(md);
};

export const route = {
  handler,
  method: 'get',
  name: 'DocumentByPath',
  path: '/document-path/:documentPath',
};

export default handler;
