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

  console.log('POPULATE res', rest);
  await DocumentPath.Create({ document_id: id }, Locations);
  await DocumentTags.Create({ document_id: id }, { tag: tags });
  await DocumentUsers.Create({ document_id: id }, { user_id: users });
  await Documents.Create({ ...rest, project: Locations.project, title: Locations.title });
}
