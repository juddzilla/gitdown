import Domain from '../interfaces/domain';

const handler = () => Domain.Git.User();

export const route = {
  handler,
  method: 'get',
  name: 'User',
  path: '/user',
};

export default handler;
