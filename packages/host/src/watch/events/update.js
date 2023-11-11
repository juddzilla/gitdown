import fs from 'fs';

import Domain from '../../interfaces/domain';
import Server from '../../services/websocket';

export default async function(filepath) {
  const WebSocket = Server();
  const id = await Domain.Files.Update(filepath);

  WebSocket.sendMessage({
    document_id: id,
    type: 'document_update',
  });
}