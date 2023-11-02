import GitUser from '../services/git-user.js';

function handler() {
  return GitUser();
}

export const route = {
  handler,
  method: 'get',
  name: 'User',
  path: '/user',
};

export default handler;
