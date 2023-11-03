import path from 'path';
import fs from 'fs';

import defaultConfig from './src/default.config';
let config = {};

const configFileName = 'gitdown.config.js';

function createDirectories(config) {
  const {
    directory,
    files,
  } = config;
  if (!fs.existsSync(path.resolve(process.cwd(), directory))){
    fs.mkdirSync(path.resolve(process.cwd(), directory), { recursive: true });
  }

  if (!fs.existsSync(path.resolve(process.cwd(), directory, files))){
    fs.mkdirSync(path.resolve(process.cwd(), directory, files), { recursive: true });
  }
}

export async function initialize(userConfig) {
  const fileConfigPath = path.resolve(process.cwd(), configFileName);
  config = {
    ...defaultConfig,
    ...(fs.existsSync(fileConfigPath) && await import(fileConfigPath)),
    ...((userConfig && Object.keys(userConfig).length) && {...userConfig})
  };

  createDirectories(config);
  return config;
}

export default config;
