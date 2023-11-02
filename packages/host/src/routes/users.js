import GitUsers from '../services/git-users.js';

const handler = (req, res) => {
  const logInfo = GitUsers();

  logInfo.push(
    {
      email: 'user18@email.com',
      name: 'User 18'
    },
    {
      email: 'user2@email.com',
      name: 'User Too'
    },
    {
      email: 'user62@email.com',
      name: 'User Sixtoo'
    },
  );
  res.send(logInfo);
};

export const route = {
  handler,
  method: 'get',
  name: 'Users',
  path: '/users',
};

export default handler;
