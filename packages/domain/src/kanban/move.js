import Database from '../interfaces/database';
import Markdown from '../interfaces/markdown';
import Move from '../files/move';
import List from './list';

export default async ({ condition, values }) => {
  const { metadata } = values;
  const FilePath = await Database.Models.DocumentPath.FullPath({ document_id: condition.id });
  const To = await Database.Models.DocumentPath.ToFullPath({ project: metadata.project, title: `${metadata.title}.md` });
  await Database.Models.DocumentPath.Update({ document_id: condition.id }, To);
  const FileHandler = new Markdown.Handler(FilePath);
  await FileHandler.init()
  await FileHandler.setMetadata(metadata);
  await FileHandler.saveFile();
  console.log(0);
  if (FilePath !== To) {
    await Move(FilePath, To);
  }
  console.log(1);
  return true;
}
