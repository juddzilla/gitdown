import Domain from '../../interfaces/domain';

const handler = async (req, res) => {
  const project = await Domain.Tags.List();
  return res.send(project);
};

export const route = {
  handler,
  method: 'get',
  name: 'Tags',
  path: '/tags',
};

export default handler;
