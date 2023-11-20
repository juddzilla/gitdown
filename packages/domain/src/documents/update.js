import Database from '../interfaces/database';
import Markdown from '../interfaces/markdown';
import Move from '../files/move';

export default async ({ condition, values }) => {
  const { html, metadata } = values;
  const body = Markdown.FromHtml(html);

  const FilePath = await Database.Models.DocumentPath.FullPath({ document_id: condition.id });
  const To = await Database.Models.DocumentPath.ToFullPath({ project: metadata.project, title: `${metadata.title}.md` });
  await Database.Models.DocumentPath.Update({ document_id: condition.id }, To);
  const FileHandler = new Markdown.Handler(FilePath);
  await FileHandler.updateFile({ body, metadata });

  if (FilePath !== To) {
    await Move(FilePath, To);
  }
  return true;
}