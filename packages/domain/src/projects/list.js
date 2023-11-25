import Database from '../interfaces/database';
const types = Database.Models.Types.List();

// export default () => Database.Models.Documents.Distinct('project');

export default () => {
  const documents = Database.Models.Documents.List({ order: 'project' });

  const results = documents.reduce((acc, cur) => {
    let key = !cur.project.length ? '(none)' : cur.project;

    if (!Object.hasOwn(acc, key)) {
      acc[key] = types.reduce((a, t) => {
        a[t] = 0;
        return a;
      }, {});
    }

    if (types.includes(cur.type)) {
      acc[key][cur.type] += 1;
    }
    return acc;

  }, {});

  return {
    results, types
  };
}