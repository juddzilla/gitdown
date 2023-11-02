import { WebSocketServer } from 'ws';
import Routing from '../routing/index.js';
import { WEBSOCKET_HOST_PORT } from '../../../env.js';

class WebSocketHost {
  constructor({ messageHandler, port }) {
    const config = {
      port: parseInt(port, 10),
    };

    const wss = new WebSocketServer(config);

    wss.on('connection', (ws) => {
      console.log('^^^^^^ SERVER CONNECTED TO');
      this.ws = ws;
      ws.on('message', (message) => {
        const parsed = JSON.parse(message);
        messageHandler(parsed);
      });
    });
  }

  sendMessage(message) {
    const stringified = JSON.stringify(message);
    console.log('@@@@@@@ HOST sent', stringified);
    this.ws.send(stringified);
  }
}


function messageHandler(message) {
  const { type } = message;
  if (type && Object.hasOwn(Routing, type)) {
    Routing[type](message);
  }
  console.log('^^^^ SERVER RECEIVED', message);
}

const port = parseInt(WEBSOCKET_HOST_PORT, 10);

export default new WebSocketHost({
  messageHandler,
  port,
});
