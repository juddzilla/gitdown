import path, { dirname } from 'path';
import fs from 'fs';
// import { fileURLToPath } from 'url';
// const __dirname = dirname(fileURLToPath(import.meta.url));

import defaultConfig from './src/default.config';

const configFileName = 'gitdown.config.js';

function createDirectories(config) {
  const {
    directory,
    files,
    root
  } = config;
  const base = path.join(root, directory, files);

  if (!fs.existsSync(base)) {
    fs.mkdirSync(base, { recursive: true });
  }
  return base;
}

class Configuration {
  constructor(props) {
    this.init(props)
  }

  async init(userConfig) {
    const fileConfigPath = path.resolve(process.cwd(), configFileName);
    const config = {
      root: process.cwd(),
      ...defaultConfig,
      ...(fs.existsSync(fileConfigPath) && await import(fileConfigPath)),
      ...((userConfig && Object.keys(userConfig).length) && {...userConfig})
    };
    const filesPath = createDirectories(config);
    const projectsPath = path.join(filesPath, config.projects);

    this.config = {
      ...config,
      filesPath,
      projectsPath,
    };
  }

  async get() {
    if (!this.config) {
      await this.init();
    }

    return this.config;
  }
}

export default new Configuration();
