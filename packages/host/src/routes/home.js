import Domain from '../interfaces/domain';

async function handler(req, res) {
  let { DATA } = req;
  const user = Domain.Git.User();
  const params = {
    query: {
      ...DATA,
      type: ['Bug', 'Task'],
      users: user.email,
    },
    matchAll: true,
  };

  const results = await Domain.Search(params);
  res.send(results);
}

export const route = {
  handler,
  method: 'get',
  name: 'Home',
  path: '/home',
};

export default handler;
