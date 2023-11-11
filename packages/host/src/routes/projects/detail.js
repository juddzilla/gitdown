import Domain from '../../interfaces/domain';

const handler = async (req, res) => {
  const { name } = req.params;
  const project = await Domain.Documents.List({ project: name });
  return res.send(project);
};

export const route = {
  handler,
  method: 'get',
  name: 'Project',
  path: '/projects/:name',
};

export default handler;
