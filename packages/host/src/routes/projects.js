import Database from '../interfaces/database';

const handler = async (req, res) => {
  const projects = await Database.Models.Documents.projects();
  return res.send(projects);
};

export const route = {
  handler,
  method: 'get',
  name: 'Projects',
  path: '/projects',
};

export default handler;
