import { initialize as Configure } from './packages/config';
import { initialize as Connection } from './packages/database';
import StartServer from './packages/host/index.js';

export default async function(userConfig) {
  const config = await Configure(userConfig);
  await Connection(config);
  console.log('config', config);
  StartServer(config);
}