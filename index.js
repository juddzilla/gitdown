import { initialize as Configure } from './packages/config';
import { initialize as Connection } from './packages/database';
import StartServer from './packages/host';

export default async function(userConfig) {
  // set config
  // setup db and tables
  // start host
  // start client
  // populate db
  //
  const config = await Configure(userConfig);
  await Connection(config);
  StartServer(config);
}