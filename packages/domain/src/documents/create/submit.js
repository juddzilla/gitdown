import Database from '../../interfaces/database';
import Markdown from '../../interfaces/markdown';

export default async ({ html, metadata }) => {
  const body = Markdown.FromHtml(html);
  const {
    tags,
    users,
    ...rest
  } = metadata;

  const FilePath = await Database.Models.DocumentPath.ToFullPath({ project: metadata.project, title: `${metadata.title}.md` });
  const FileHandler = new Markdown.Handler(FilePath);
  const FileId = FileHandler.fileId();
  try {
    await Database.Models.DocumentPath.Update({ document_id: FileId }, FilePath);
    await Database.Models.Documents.Update({ id: FileId }, rest);
    await Database.Models.DocumentTags.Update({ document_id: FileId }, tags || []);
    await Database.Models.DocumentUsers.Update({ document_id: FileId }, users || []);

    await FileHandler.createFile({ body, metadata });
    return { created: FileId };
  } catch (Err) {
    console.warn('Submit Err', Err);
  }
}