import Base from './base';
import OneToMany from './one-to-many';
import DocumentPaths from './document_paths';
import Priorities from './Priorities.js';
import Statuses from './Statuses.js';
import Types from './Types.js';

export default {
  DocumentPath: new DocumentPaths({ name: 'document_paths' }),
  Documents: new Base({ name: 'documents' }),
  DocumentTags: new OneToMany({ name: 'document_tags' }),
  DocumentUsers: new OneToMany({ name: 'document_users' }),
  Priorities,
  Projects: new Base({ name: 'projects' }),
  Statuses,
  Tags:  new Base({ name: 'tags' }),
  Types,
  Users:  new Base({ name: 'users' }),
  // Operations,
};
