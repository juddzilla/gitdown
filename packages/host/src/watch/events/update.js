import fs from 'fs';

import Database from '../../interfaces/database';
import Markdown from '../../interfaces/markdown';

import Server from '../../services/websocket';

const { Update } = Database.Queries;
const { DocumentPath } = Database.Models;

export default async function(filepath) {
  const WebSocket = Server();
  const markdown = new Markdown.Handler(filepath);
  await markdown.init();
  const data = markdown.getMetadata();

  const existingDocumentWithId = DocumentPath.find({ document_id: data.id });
  const { filename, path } = existingDocumentWithId;
  const existingDocumentFilepath = [path, filename].join('/');

  if (existingDocumentWithId && existingDocumentFilepath !== filepath) {
    const updated = fs.statSync(filepath);
    const existing = fs.statSync(existingDocumentFilepath);
    const updatedFileIsNewer = updated.birthtimeMs > existing.birthtimeMs;

    if (updatedFileIsNewer) {
      await markdown.createNewId();
    } else {
      const existingMarkdown = await new Markdown.Handler(existingDocumentFilepath);
      await existingMarkdown.init();
      await existingMarkdown.createNewId();
    }
    return;
  }

  await Update({ ...data, filepath });
  WebSocket.sendMessage({
    document_id: data.id,
    type: 'document_update',
  });
}