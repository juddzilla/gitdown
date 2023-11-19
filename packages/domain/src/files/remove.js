import Database from '../interfaces/database';
import Git from '../interfaces/git';

const {
  DocumentPath,
  Documents,
  DocumentTags,
  DocumentUsers,
} = Database.Models;

export default async function (filepath) {
  const documentId = DocumentPath.FindAndRemove(filepath);

  try {
    if (documentId) {
      await Git.RemoveFile(filepath);
      [DocumentTags, DocumentUsers, Documents].forEach((type) => type.Remove(documentId));
      return documentId;
    }
  } catch (error) {
    return { error };
  }
}
