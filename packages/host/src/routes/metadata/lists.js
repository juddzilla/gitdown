import Domain from '../../interfaces/domain';

const handler = (req, res) => {
  const lists = Domain.Metadata.Lists();
  return res.send(lists);
}

export const route = {
  method: 'get',
  name: 'Lists',
  path: '/lists',
  handler,
};

export default handler;
