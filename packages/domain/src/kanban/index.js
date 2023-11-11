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
  console.log('group', group);
  const grouping = groupMap[group]();
  console.log('GROUING', grouping);

  const grouped = data.reduce((acc, cur) => {
    if (!Object.hasOwn(acc, cur[group])) {
      acc[cur[group]] = [];
    }
    acc[cur[group]].push(cur);
    return acc;
  }, {});

  console.log('grouped', grouped);

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

export default async (params) => {
  const data = await Database.Queries.Kanban(params);

  return setGroup(params.group, data);
}