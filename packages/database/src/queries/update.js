import Tables from '../tablesold/index.js';

const {
  DocumentPath,
  Documents,
  DocumentTags,
  DocumentUsers,
} = Tables;

export default async function (data) {
  const {
    filepath,
    tags,
    users,
    ...rest
  } = data;

  const { id } = rest;

  try {
    Documents.update(id, rest);
    DocumentPath.update(id, filepath);
    DocumentTags.update(id, tags);
    DocumentUsers.update(id, users);
    return data;
  } catch (error) {
    return { error };
  }
}
