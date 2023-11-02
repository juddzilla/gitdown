import Database from '../interfaces/database';

const handler = (req, res) => {
  const results = Datebase.Queries.Kanban(req.query);
  return res.send({ results });
}

export const route = {
  method: 'get',
  name: 'Kanban',
  path: '/kanban',
  handler,
};

export default handler;
