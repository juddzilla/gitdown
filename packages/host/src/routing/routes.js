import path from 'path';
//
// import config from '../../../config.js';
import Utils from '../interfaces/utils';

// const { workingDir } = config;

export const paths = path.resolve('src', 'routes', '**', '*.js');

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
