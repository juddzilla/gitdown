import Base from './base';
import Instance from '../instance/connection';

import {
  arrayValueStatement,
  keyEqualsOrIn,
  truthyValue,
} from '../utils.js';

import {
  activesInactiveStatuses,
  activeStatuses,
  inactiveStatuses
} from './Statuses';

const Statuses = activesInactiveStatuses;

const groupByMap = {
  status: 'documents.id',
  tag: 'document_tags.tag, documents.id',
  user_id: 'document_users.user_id, documents.id',
};

export default class Documents extends Base {
  constructor(props) {
    super(props);
  }

  async Find(id) {
    const DB = await Instance();
    const parts = [`
    SELECT
    documents.*,
    group_concat(DISTINCT document_tags.tag) as tags,
    group_concat(DISTINCT document_users.user_id) as users
    FROM documents
    LEFT JOIN    
    document_tags
    ON documents.id = document_tags.document_id
    LEFT JOIN
    document_users
    ON documents.id = document_users.document_id
    WHERE documents.id = '${id}'
    GROUP BY documents.id
  `];

    const statement = parts.join(' ');
    const prepared = DB.prepare(statement);

    try {
      const executed = prepared.get();
      if (!Object.hasOwn(executed, 'id')) {
        return {};
      }
      const {
        tags,
        users,
        ...rest
      } = executed;

      return {
        tags: tags ? tags.split(',') : null,
        users: users ? users.split(',') : null,
        ...rest,
      };
    } catch (err) {
      return { error: err };
    }
  }


  Search(params) {
    const {
      group,
      query,
      matchAll,
    } = params;

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
      'documents.title',
      'documents.type',
      'documents.updated',
      'document_tags.tag',
      'document_users.user_id',
    ];

    const where = [];

    if (!query || !Object.keys(query).length) {
      where.push(arrayValueStatement('documents', { status: activesInactiveStatuses }));
    } else {
      const {
        name,
        priority,
        project,
        status,
        tag,
        type,
        users,
      } = query;

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
    }


    const joinBlock = joins.join(' ');
    const returnBlock = returnColumns.join(', ');
    const whereBlock = where.join(` ${separator} `);

    let groupBy = groupByMap.status;

    if (Object.hasOwn(groupByMap, group)) {
      groupBy = groupByMap[group];
    }

    const statement = [
      'SELECT',
      returnBlock,
      'FROM documents',
      joinBlock,
      'WHERE',
      whereBlock,
      'GROUP BY',
      groupBy,
    ].join(' ');

    return this.query(statement);
  }
}