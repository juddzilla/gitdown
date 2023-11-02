import { execSync } from 'child_process';

export default function logInfo() {
  const logs = execSync("git shortlog -sne --all", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    return stdout;
  }).toString();

  if (!logs) {
    return 'logs error';
  }

  const rows = logs.trim().split('\n');

  return rows.map(row => {
    const scrubbed = row.replace(/<|>|(.*?)\t/g, '').split(' ');
    const email = scrubbed[2];
    const firstName = scrubbed[0];
    const lastName = scrubbed[1];
    const name = [firstName, lastName].join(' ');
    return {
      email,
      firstName,
      lastName,
      name,
    };
  });
}
