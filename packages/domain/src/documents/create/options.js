import Database from '../../interfaces/database';
import Markdown from '../../interfaces/markdown';

export default async ({ project, type }) => {
  const list = {
    priorities: Database.Models.Priorities.List(),
    projects: project,
    statuses: Database.Models.Statuses.PreActive(),
    tags: Database.Models.DocumentTags.Unique('tag'),
    types: type,
    users: Database.Models.DocumentUsers.Unique('user_id'),
  };
  const template = await Markdown.Template(type);

  return {
    html: Markdown.ToHtml(template.body),
    metadata: { ...template.attributes, project, due: new Date().getTime() },
    list,
  }
}