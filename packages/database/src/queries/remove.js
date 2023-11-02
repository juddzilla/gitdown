import Tables from '../tablesold/index.js';

const {
  DocumentPath,
  Documents,
  DocumentTags,
  DocumentUsers,
} = Tables;

export default async function (filepath) {
  const documentId = DocumentPath.findAndRemove(filepath);

  try {
    if (documentId) {
      [DocumentTags, DocumentUsers, Documents].forEach((type) => type.delete(documentId));
      return true;
    }
  } catch (error) {
    return { error };
  }
}
