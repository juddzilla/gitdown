import Database from '../interfaces/database';

const handler = (req, res) => {
  const values = Database.Queries.Distinct(req.query.name);
  return res.send(values);
}

export const route = {
  method: 'get',
  name: 'Distinct',
  path: '/distinct',
  handler,
};

export default handler;