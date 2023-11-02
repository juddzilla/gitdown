import { execSync } from 'child_process';

export default function() {
  const email = execSync("git config --global user.email").toString().replace(/\n/g, '');
  const name = execSync("git config --global user.name").toString().replace(/\n/g, '');

  if (!name || !email) {
    return 'user error error';
  }
  // return { email, name };
  return { email: 'user18@email.com', name };
}