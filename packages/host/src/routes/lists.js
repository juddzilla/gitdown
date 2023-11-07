import DB from '../interfaces/database';

const handler = (req, res) => {
  return res.send({
    priorities: DB.Models.Priorities.List(),
    projects: DB.Models.Projects.List(),
    statuses: DB.Models.Statuses.Active(),
    tags: DB.Models.Tags.List(),
    types: DB.Models.Types.List(),
    users: DB.Models.Users.List(),
  });
}

export const route = {
  method: 'get',
  name: 'Lists',
  path: '/lists',
  handler,
};

export default handler;
