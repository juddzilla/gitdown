import Database from '../interfaces/database';

const handler = async (req, res) => {
  const { name } = req.params;
  const project = await Database.Models.Documents.Where({ project: name });
  return res.send(project);
};

export const route = {
  handler,
  method: 'get',
  name: 'Project',
  path: '/project/:name',
};

export default handler;
