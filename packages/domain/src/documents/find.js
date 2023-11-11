import path from 'path';
import Database from '../interfaces/database';
import Files from '../interfaces/files';
import Markdown from '../markdown';

export default async (data) => {
  const documentPath = Database.Models.DocumentPath.Find(data);
  const filepath = path.join(documentPath.results.path, documentPath.results.filename);

  const FileHandler = new Files.Handler(filepath);
  const fileData = await FileHandler.getData();
  const html = Markdown.ToHtml(fileData.body);

  return {
    metadata: fileData.metadata,
    html,
  };
};