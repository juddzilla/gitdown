import Database from '../../interfaces/database';
import Server from '../../services/websocket.js';

export default async function(filepath) {
  const WebSocket = Server();
  const documentId = await Database.Queries.Remove(filepath);
  WebSocket.sendMessage({
    documentId,
    type: 'document_remove',
  });
}