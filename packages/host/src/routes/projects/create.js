import Domain from '../../interfaces/domain';

const handler = async (req, res) => {
  const { name } = req.DATA;
  const result = await Domain.Projects.Create({ name });
  return res.send(result);
};

export const route = {
  handler,
  method: 'post',
  name: 'ProjectCreate',
  path: '/projects',
};

export default handler;
