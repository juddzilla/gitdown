import Database from '../interfaces/database';

export default () => ({
  priorities: Database.Models.Priorities.List(),
  // projects: Database.Models.Documents.Unique('project'),
  statuses: Database.Models.Statuses.List(),
  tags: Database.Models.DocumentTags.Unique('tag'),
  // types: Database.Models.Types.List(),
  users: Database.Models.DocumentUsers.Unique('user_id'),
})