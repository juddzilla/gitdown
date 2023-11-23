import Domain from '../../interfaces/domain.js';

const handler = async (req, res) => {
  const results = await Domain.Kanban.List(req.DATA);
  return res.send({ results });
}

export const route = {
  method: 'get',
  name: 'Kanban',
  path: '/kanban',
  handler,
};

export default handler;
