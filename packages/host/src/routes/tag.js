import Database from '../interfaces/database';

const handler = async (req, res) => {
  const { name } = req.params;
  const project = await Database.Models.DocumentTags.Where(name);
  return res.send(project);
};

export const route = {
  handler,
  method: 'get',
  name: 'Tag',
  path: '/tags/:name',
};

export default handler;
