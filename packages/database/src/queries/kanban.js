import StringToArray from '../../utils/strToArray.js';

import DB from "../connection.js";
import moment from "moment";

import {
  arrayValueStatement,
  keyEqualsOrIn,
  truthyValue,
} from '../utils.js';
import Statuses, { activeStatuses, inactiveStatuses } from '../../config/statuses.js';

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
    let name = result.filename;

    if (name.indexOf('.md') > -1) {
      result.filename = name.split('.md')[0];
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

export default function(params) {
  const {
    matchAll,
    ...rest
  } = params;

  Object.keys(rest).forEach(key => {
    const toArray = [
      'priority',
      'project',
      'status',
      'tag',
      'type',
      'users',
    ];

    if (toArray.includes(key)) {
      rest[key] = StringToArray(rest[key]);
    }
  });

  const {
    name,
    priority,
    project,
    status,
    tag,
    type,
    users,
  } = rest;

  console.log('rest', rest);

  const separator = matchAll && matchAll === 'true' ? 'AND' : 'OR';

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

  const where = [];

  if (!Object.keys(rest).length) {
    where.push(arrayValueStatement('documents', { status: activeStatuses }));
  }

  if (truthyValue(status)) {
    let statuses;

    if (status === 'all_active') {
      statuses = activeStatuses
    } else if (status === 'all_inactive') {
      statuses = inactiveStatuses;
    } else if (status === 'all') {
      statuses = Statuses;
    } else {
      statuses = status;
    }

    where.push(arrayValueStatement('documents', { status: statuses }));
  }

  if (truthyValue(project)) {
    const projects = keyEqualsOrIn({ ['documents.project']: project }).filter((item) => item);
    where.push(projects);
  }

  if (truthyValue(priority)) {
    const priorities = keyEqualsOrIn({ ['documents.priority']: priority }).filter((item) => item);
    where.push(priorities);
  }

  if (truthyValue(type)) {
    const types = keyEqualsOrIn({ ['documents.type']: type }).filter((item) => item);
    where.push(types);
  }

  if (truthyValue(name)) {
    where.push(`document_paths.filename LIKE '%${name}%' OR documents.id LIKE '%${name}%'`);
  }

  if (truthyValue(tag)) {
    where.push(arrayValueStatement('document_tags', { tag }));
  }

  if (truthyValue(users)) {
    const splitUsersWhereBlock = arrayValueStatement('document_users', { user_id: users });
    where.push(splitUsersWhereBlock);
  }

  const joinBlock = joins.join(' ');
  const returnBlock = returnColumns.join(', ');
  const whereBlock = where.join(` ${separator} `);
  const statement = [
    'SELECT',
    returnBlock,
    'FROM documents',
    joinBlock,
    'WHERE',
    whereBlock,
  ].join(' ');
  console.log('KANBAN QUERY STATEMENT', statement);
  const prepared = DB.prepare(statement);
  const results = prepared.all();
  console.log('KANBAN QUERY RESLTS', consolidate(results));
  return consolidate(results);
}
