// import path from 'path';
//
// import config from '../../../config.js';
import Utils from '../interfaces/utils';

// const { workingDir } = config;

export default async (directoryStart) => {
  // const directoryStart = path.join(workingDir, 'src', 'host', 'handlers', '**', '*.js');
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
