import Database from '../interfaces/database';
import Utils from '../interfaces/utils';

const {
  DocumentPath,
  Documents,
  DocumentTags,
  DocumentUsers,
} = Database.Models;

export default async function (data) {
  if (!Object.hasOwn(data, 'id')) {
    return;
  }
  const {
    filepath,
    tags,
    users,
    ...rest
  } = data;

  const Locations = await Utils.Project_Title(filepath);

  const { id } = rest;

  DocumentPath.Create({ document_id: id }, Locations);
  console.log('ID', id, tags);
  DocumentTags.Create({ document_id: id }, { tag: tags });
  DocumentUsers.Create({ document_id: id }, { user_id: users });
  Documents.Create({ ...rest, project: Locations.project, title: Locations.title });
}
