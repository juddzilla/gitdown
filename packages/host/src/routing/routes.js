import path from 'path';
//
// import config from '../../../config.js';
import Utils from '../interfaces/utils';

// const { workingDir } = config;

export default async () => {
  const directoryStart = path.join(process.cwd(), 'packages', 'host', 'src', 'routes', '**', '*.js');
  const filepaths = await Utils.FindFiles(directoryStart);
  const routes = await Promise.all(filepaths.map(async (handler) => {
    const { route } = await import(handler);

    if (route) {
      return route;
    }

    return null;
  }));

  return routes.filter(Boolean);
};
