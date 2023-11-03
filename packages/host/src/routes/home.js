import Database from '../interfaces/database';

import GitUser from '../services/git-user.js';

function handler(req, res) {
  let { query } = req;

  const user = GitUser();

  query.users = user.email;
  query.matchAll = 'true';
  console.log('query', query);
  const params = Object.keys(query).reduce((acc, key) => {
    const value = query[key];
    acc[key] = value.includes(',') ? value.split(',') : value;
    return acc;
  }, {});

  const search = Database.Queries.Search(params);
  res.send({ search });
}

export const route = {
  handler,
  method: 'get',
  name: 'Home',
  path: '/home',
};

export default handler;
