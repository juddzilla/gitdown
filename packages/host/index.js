import path from 'path';
import configure from './src/interfaces/config';
import { Connection } from './src/interfaces/database';

import Server from './src/server';
import Watch from './src/watch/';
import { init as Websocket } from './src/services/websocket';

(async function() {
  const config = await configure();
  await Connection();
  const { directory, files, ports, serverAddress } = config;
  const filesPath = path.resolve('../../', directory, files);
  Server({ port: ports.host, host: serverAddress });
  Watch({ files: filesPath, port: ports.websocket });
  Websocket({ port: ports.websocket });
}())