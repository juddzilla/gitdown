import Domain from '../../interfaces/domain';
import Server from '../../services/websocket.js';

export default async function(filepath) {
  const WebSocket = Server();
  const documentId = await Domain.Files.Remove(filepath);
  WebSocket.sendMessage({
    documentId,
    type: 'document_remove',
  });
}