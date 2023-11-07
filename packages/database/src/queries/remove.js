import Models from '../models/index.js';

const {
  DocumentPath,
  Documents,
  DocumentTags,
  DocumentUsers,
} = Models;

export default async function (filepath) {
  const documentId = DocumentPath.FindAndRemove(filepath);

  console.log('rem', documentId);

  try {
    if (documentId) {
      [DocumentTags, DocumentUsers, Documents].forEach((type) => type.Remove(documentId));
      return documentId;
    }
  } catch (error) {
    return { error };
  }
}
