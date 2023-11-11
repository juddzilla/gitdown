import Domain from '../interfaces/domain';

function handler(req, res) {
  let { DATA } = req;
  const user = Domain.Git.User();
  const data = {
    ...DATA,
    users: user.email,
    matchAll: true,
  };

  const search = Domain.Search(data);
  res.send({ search });
}

export const route = {
  handler,
  method: 'get',
  name: 'Home',
  path: '/home',
};

export default handler;
