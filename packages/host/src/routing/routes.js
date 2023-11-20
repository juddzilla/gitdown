import path, { dirname } from 'path';
import Utils from '../interfaces/utils';

import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const paths = path.join(path.dirname(__dirname), 'routes', '**', '*.js');
export default async () => {
  const filepaths = await Utils.FindFiles(paths);
  const routes = await Promise.all(filepaths.map(async (handler) => {
    const { route } = await import(handler);

    if (route) {
      return route;
    }

    return null;
  }));

  return routes.filter(Boolean);
};
