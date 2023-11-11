import Database from '../interfaces/database.js';

const {
  DocumentPath,
  Documents,
  DocumentTags,
  DocumentUsers,
} = Database.Models;

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

  DocumentPath.Create({ document_id: id }, { filepath });
  DocumentTags.Create({ document_id: id }, { tag: tags });
  DocumentUsers.Create({ document_id: id }, { user_id: users });
  Documents.Create(rest);
}
