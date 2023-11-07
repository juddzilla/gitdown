import Domain from '../interfaces/domain';

const handler = async (req, res) => {
  const projects = await Domain.Projects.List();
  console.log('OPRJEC', projects);
  return res.send(projects);
};

export const route = {
  handler,
  method: 'get',
  name: 'Projects',
  path: '/projects',
};

export default handler;
