import path from 'path';

import Server from './src/server';
import Watch from './src/watch/';
import { init as Websocket } from './src/services/websocket';

export default function({ directory, files, ports }) {
  const filesPath = path.resolve(process.cwd(), directory, files);
  Server({ port: ports.host });
  Watch({ files: filesPath, port: ports.websocket });
  Websocket({ port: ports.websocket });
}