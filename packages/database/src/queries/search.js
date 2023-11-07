import moment from 'moment';

import Instance from '../instance/connection.js';

import {
  arrayValueStatement,
  keyEqualsOrIn,
  truthyValue,
} from '../utils.js';

const consolidate = (results) => {
  const many = {
    tag: 'tags',
    user_id: 'users',
  };

  const map = results.reduce((acc, result) => {
    const id = result.id;
    if (!acc[id]) {
      acc[id] = {};
    }

    Object.keys(result).forEach(attr => {
      const value = result[attr];

      if (Object.keys(many).includes(attr)) {
        const key = many[attr];

        if (!acc[id][key]) {
          acc[id][key] = [];
        }

        if (!acc[id][key].includes(value)) {
          acc[id][key].push(value);
        }
      } else {
        acc[id][attr] = value;
      }

      if (!acc[id].updatedAt) {
        acc[id].updatedAt = moment(result.updated).format('MM/DD/YY');
      }
    });

    return acc;
  }, {});

  return Object.keys(map).map(id => (map[id]));
};

export default function (params) {
  const DB = Instance();
  const {
    matchAll,
    name,
    orderBy,
    orderByDirection,
    tags,
    users,
    ...rest
  } = params;

  if (!name && !tags && !users && !Object.keys(rest).length) {
    return { search: [] };
  }

  const separator = matchAll === 'true' ? ' AND ' : ' OR ';

  const joins = [
    'JOIN document_paths on document_paths.document_id = documents.id',
    'JOIN document_tags on documents.id = document_tags.document_id',
    'JOIN document_users on documents.id = document_users.document_id',
  ];

  const returnColumns = [
    'DISTINCT documents.id',
    'document_paths.path',
    'document_paths.filename',
    'documents.priority',
    'documents.project',
    'documents.status',
    'documents.type',
    'documents.updated',
    'document_tags.tag',
    'document_users.user_id',
  ];

  let orderByValues = {
    column: 'updated',
    direction: 'DESC',
  };

  if (orderBy) {
    const orderByMap = {
      name: 'document_paths.filename',
      priority: 'documents.priority',
      project: 'documents.project',
      status: 'documents.status',
      type: 'documents.type',
      updated: 'documents.updated',
    };

    orderByValues.column = orderByMap[orderBy];
  }

  if (orderByDirection) {
    orderByValues.direction  = orderByDirection;
  }

  const where = keyEqualsOrIn(rest).filter((item) => item);

  console.log('where', rest);

  if (truthyValue(name)) {
    where.push(`document_paths.filename LIKE '%${name}%' OR documents.id LIKE '%${name}%'`);
  }

  if (truthyValue(tags)) {
    where.push(arrayValueStatement('document_tags', { tag: tags }));
  }

  if (truthyValue(users)) {
    where.push(arrayValueStatement('document_users', { user_id: users }));
  }

  // SELECT DISTINCT documents.id, document_paths.path, document_paths.filename, documents.priority, documents.project, documents.status, documents.type, documents.updated, document_tags.tag, document_users.user_id FROM documents JOIN document_paths on document_paths.document_id = documents.id JOIN document_tags on documents.id = document_tags.document_id JOIN document_users on documents.id = document_users.document_id WHERE documents.status IN ('Draft','In Progress','In Review','Open','To Do','Under Review') GROUP BY documents.id;


  const joinBlock = joins.join(' ');
  const orderByBlock = Object.values(orderByValues).join(' ');
  const returnBlock = returnColumns.join(', ');
  const whereBlock = where.join(separator);
  const statement = [
    'SELECT',
    returnBlock,
    'FROM documents',
    joinBlock,
    'WHERE',
    whereBlock,
    `ORDER BY`,
    orderByBlock,
    ';',
  ].join(' ');
  console.log('statement', statement);
  const prepared = DB.prepare(statement);
  const results = prepared.all();
  return consolidate(results);
}
