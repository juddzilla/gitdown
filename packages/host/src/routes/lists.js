import Database from '../interfaces/database';

const handler = (req, res) => {
  const values = Database.Queries.Lists();
  return res.send({ ...values });
}

export const route = {
  method: 'get',
  name: 'Lists',
  path: '/lists',
  handler,
};

export default handler;
