import Domain from '../../interfaces/domain';

const handler = async (req, res) => {
  const { name } = req.DATA;
  const result = await Domain.Tags.Create({ name });
  return res.send(result);
};

export const route = {
  handler,
  method: 'post',
  name: 'TagCreate',
  path: '/tags',
};

export default handler;
