/* eslint-disable func-names */
import path from 'path';
import fs from 'fs';
import Routes from './routes';

const exportDirectory = 'public';
const exportName = 'paths.json';
const publicPathsDir = path.join(process.cwd(), exportDirectory, exportName);

export default async function() {
  const routes = await Routes();
  const paths = routes.reduce((acc, value) => {
    const { method, name } = value;
    acc[name] = { method, path: value.path };
    return acc;
  }, {});

  return fs.writeFile(publicPathsDir, JSON.stringify(paths, null, 2), (err) => {
    if (err) {
      console.log('write paths err', err);
      throw err;
    }
    process.exit();
  });
}
