import Domain from '../../interfaces/domain.js';

const handler = async (req, res) => {
  const results = await Domain.Kanban.Move(req.DATA);
  return res.send({ results });
}

export const route = {
  method: 'put',
  name: 'KanbanMove',
  path: '/kanban/:id',
  handler,
};

export default handler;
