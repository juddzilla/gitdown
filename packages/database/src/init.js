import path from 'path';
import fs from 'fs';

import Build from './build';
import Create from './create';
import { setDatabase } from './connection';

const configFileName = 'gitdown.config.js';

export default async function(defaultConfig) {
  let config = { ...defaultConfig };

  const userConfig = path.resolve(process.cwd(), configFileName);
  if (fs.existsSync(userConfig)) {
    const userConfigFile = await import(userConfig);
    config = { ...config, ...userConfigFile };
  }

  console.log('config', config);

  const DB = await Create(config)
  setDatabase(DB);
  await Build(DB, config);
}
