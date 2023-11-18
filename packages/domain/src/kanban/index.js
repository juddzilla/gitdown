import Database from '../interfaces/database';

const groupMap = {
  priority: Database.Models.Priorities.List,
  project: () => Database.Models.Projects.List(),
  status: Database.Models.Statuses.List,
  tag: () => Database.Models.DocumentTags.Unique('tag'),
  type: Database.Models.Types.List,
  user_id: () => Database.Models.DocumentUsers.Unique('user_id'),
};

const setGroup = (group, data) => {
  const grouping = groupMap[group]();

  const grouped = data.reduce((acc, cur) => {
    if (!Object.hasOwn(acc, cur[group])) {
      acc[cur[group]] = [];
    }
    acc[cur[group]].push(cur);
    return acc;
  }, {});

  if (['priority', 'status', 'type'].includes(group)) {
    return grouping.map(group => {
      return {
        name: group,
        results: grouped[group] || []
      }
    });
  } else if (group === 'users') {

  } else {
    return Object.keys(grouped).sort().map(key => {
      return {
        name: key,
        results: grouped[key]
      };
    });
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