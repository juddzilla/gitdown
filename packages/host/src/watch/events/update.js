import fs from 'fs';

import Database from '../../interfaces/database';
console.log('DATA', Database);
import Markdown from '../../interfaces/markdown';

import Server from '../../services/websocket';

const { Update } = Database.Queries;
const { DocumentPath } = Database.Models;

export default async function(filepath) {
  const WebSocket = Server();
  const markdown = new Markdown.Handler(filepath);
  await markdown.init();
  const data = markdown.getMetadata();

  const existingDocumentWithId = DocumentPath.Find({ document_id: data.id });
  console.log('existingDocumentWithId', existingDocumentWithId);
  const { filename, path } = existingDocumentWithId;
  const existingDocumentFilepath = [path, filename].join('/');
  // return;
  console.log('existingDocumentWithId && existingDocumentFilepath !== filepath',existingDocumentWithId && existingDocumentFilepath !== filepath);
  if (existingDocumentWithId && existingDocumentFilepath !== filepath) {
    const updated = fs.statSync(filepath);
    const existing = fs.statSync(existingDocumentFilepath);
    const updatedFileIsNewer = updated.birthtimeMs > existing.birthtimeMs;

    if (updatedFileIsNewer) {
      console.log(0);
      await markdown.createNewId();
    } else {
      console.log(1);
      const existingMarkdown = await new Markdown.Handler(existingDocumentFilepath);
      await existingMarkdown.init();
      await existingMarkdown.createNewId();
    }
  }
  console.log('markdown.getMetadata()', markdown.getMetadata());

    return;
  await Update({ ...data, filepath });
  WebSocket.sendMessage({
    document_id: data.id,
    type: 'document_update',
  });
}