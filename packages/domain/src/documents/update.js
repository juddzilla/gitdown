import path from 'path';
import Database from '../interfaces/database';
import Files from '../interfaces/files';
import Markdown from '../markdown';

export default async ({ condition, values }) => {
  const { html, metadata } = values;

  // update file
  const body = Markdown.FromHtml(html);
  const documentPath = Database.Models.DocumentPath.Find({ document_id: condition.id });
  const filepath = path.join(documentPath.results.path, documentPath.results.filename);

  const FileHandler = new Files.Handler(filepath);
  await FileHandler.updateFile({ body, metadata });

  // update DB
  await Database.Models.Documents.Update({ id: condition.id }, metadata);
  await Database.Models.DocumentTags.Update({ document_id: condition.id }, metadata.tags);
  await Database.Models.DocumentUsers.Update({ document_id: condition.id }, metadata.users);
  return true;
}