import { WebSocketServer } from 'ws';
import Routing from '../routing/index.js';

let ws = null;

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
    console.log('send mesage', message);
    if (this.ws) {
      const stringified = JSON.stringify(message);
      console.log('@@@@@@@ HOST sent', stringified);
      this.ws.send(stringified);
    }
  }
}

export function init({ port }) {
  function messageHandler(message) {
    const { type } = message;
    if (type && Object.hasOwn(Routing, type)) {
      Routing[type](message);
    }
    console.log('^^^^ SERVER RECEIVED', message);
  }

  ws = new WebSocketHost({
    messageHandler,
    port: parseInt(port, 10),
  });
}

export default () => ws;

// export default ws;
