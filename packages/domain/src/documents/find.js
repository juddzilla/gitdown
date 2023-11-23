import path from 'path';
import Configuration from '../interfaces/config';
import Database from '../interfaces/database';
import Markdown from '../interfaces/markdown.js';

export default async (data) => {
  const config = await Configuration.get();
  const documentPath = Database.Models.DocumentPath.Find(data);
  const filepath = path.join(config.projectsPath, documentPath.results.path, documentPath.results.filename);
  const FileHandler = new Markdown.Handler(filepath);
  const fileData = await FileHandler.getData();
  const html = Markdown.ToHtml(fileData.body);

  return {
    metadata: fileData.metadata,
    html,
  };
};