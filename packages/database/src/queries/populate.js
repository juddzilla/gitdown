import Tables from '../tablesold/index.js';

const {
  DocumentPath,
  Documents,
  DocumentTags,
  DocumentUsers,
} = Tables;

export default function (data) {
  if (!Object.hasOwn(data, 'id')) {
    return;
  }
  const {
    filepath,
    tags,
    users,
    ...rest
  } = data;

  const { id } = rest;

  DocumentPath.create(id, filepath);
  DocumentTags.create(id, tags);
  DocumentUsers.create(id, users);
  Documents.create(rest);
}
