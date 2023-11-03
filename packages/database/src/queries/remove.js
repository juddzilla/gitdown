import Tables from '../models/index.js';

const {
  DocumentPath,
  Documents,
  DocumentTags,
  DocumentUsers,
} = Tables;

export default async function (filepath) {
  const documentId = DocumentPath.findAndRemove(filepath);

  console.log('rem', documentId);

  try {
    if (documentId) {
      [DocumentTags, DocumentUsers, Documents].forEach((type) => type.delete(documentId));
      return documentId;
    }
  } catch (error) {
    return { error };
  }
}
