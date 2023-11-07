import Models from '../models/index.js';

const {
  DocumentPath,
  Documents,
  DocumentTags,
  DocumentUsers,
} = Models;

export default async function (data) {
  const {
    filepath,
    tags,
    users,
    ...rest
  } = data;

  const { id } = rest;

  try {
    Documents.Update(id, rest);
    DocumentPath.Update(id, filepath);
    DocumentTags.Update(id, tags);
    DocumentUsers.Update(id, users);
    return data;
  } catch (error) {
    return { error };
  }
}
