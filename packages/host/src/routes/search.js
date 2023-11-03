import Database from '../interfaces/database';

const handler = (req, res) => {
  const { query } = req;

  if (Object.keys(query).length === 0) {
    res.status(204).send({});
  }

  const params = Object.keys(query).reduce((acc, key) => {
    const value = query[key];
    acc[key] = value.includes(',') ? value.split(',') : value;
    return acc;
  }, {});

  const search = Database.Queries.Search(params);
  res.send({ search });
};

export const route = {
  handler,
  method: 'get',
  name: 'Search',
  path: '/search',
};
export default handler;