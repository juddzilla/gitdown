import configuration from './src/interfaces/config';

import Server from './src/server';
import Watch from './src/watch/';
import { init as Websocket } from './src/services/websocket';

export default async function(userConfig) {
  await configuration.init(userConfig);
  const config = await configuration.get();

  const { ports, serverAddress } = config;
  Server({ port: ports.host, host: serverAddress });
  Watch({ files: config.filesPath, port: ports.websocket });
  Websocket({ port: ports.websocket });
}