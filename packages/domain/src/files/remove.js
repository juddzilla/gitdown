import Database from '../interfaces/database';

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
      [DocumentTags, DocumentUsers, Documents].forEach((type) => type.Remove(documentId));
      return documentId;
    }
  } catch (error) {
    return { error };
  }
}
