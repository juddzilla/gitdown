import Domain from '../../interfaces/domain';

const handler = async (req, res) => {
  const { name } = req.params;
  const project = await Domain.Documents.List({ project: name });
  const types = await Domain.Types.List();
  return res.send({ project, types });
};

export const route = {
  handler,
  method: 'get',
  name: 'Project',
  path: '/projects/:name',
};

export default handler;
