import Domain from '../interfaces/domain';

const handler = async (req, res) => {
  const results = await Domain.Kanban(req.DATA);
  return res.send({ results });
}

export const route = {
  method: 'get',
  name: 'Kanban',
  path: '/kanban',
  handler,
};

export default handler;
