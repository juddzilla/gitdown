import Database from '../interfaces/database';

const groupMap = {
  priority: Database.Models.Priorities.List,
  project: () => Database.Models.Projects.List(),
  status: Database.Models.Statuses.List,
  tags: () => Database.Models.DocumentTags.Unique('tag'),
  type: Database.Models.Types.List,
  users: () => Database.Models.DocumentUsers.Unique('user_id'),
};

const setGroup = (group, data) => {
  const grouping = groupMap[group]();

  const grouped = data.reduce((acc, cur) => {
    if (Array.isArray(cur[group])) {
      for (let j = 0; j < cur[group].length; j++) {
        if (!Object.hasOwn(acc, [cur[group][j]])) {
          acc[cur[group][j]] = [];
        }
        acc[cur[group][j]].push(cur);
      }
    } else {
      if (!Object.hasOwn(acc, cur[group])) {
        acc[cur[group]] = [];
      }
      acc[cur[group]].push(cur);
    }
    return acc;
  }, {});

  if (['priority', 'status', 'tags', 'type', 'users'].includes(group)) {
    return grouping.map(group => {
      return {
        name: group,
        results: grouped[group] || []
      }
    });
  } else {
    return Object.keys(grouped).sort().map(key => ({
      name: key.length ? key : '(none)',
      results: grouped[key]
    }));
  }
};

export default async (group) => {
  const [err, data] = await Database.Models.Documents.Search(group);
  if (err) {
    console.warn('KANBAM err', err);
    return [];
  }
  return setGroup(group.group, data);
}