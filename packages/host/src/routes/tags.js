import Database from '../interfaces/database';

const handler = async (req, res) => {
  const project = await Database.Models.DocumentTags.List();
  return res.send(project);
};

export const route = {
  handler,
  method: 'get',
  name: 'Tags',
  path: '/tags',
};

export default handler;
