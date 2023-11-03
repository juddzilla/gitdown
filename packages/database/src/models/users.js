import Base from './base.js';

import tableInfo from '../schemas/users.json' assert { type: 'json' };

// export const tableInfo = {
//   columns: {
//     email: 'TEXT UNIQUE',
//     name: 'TEXT',
//   },
//   name: 'users',
// };

class Users extends Base {
  create(data) {
    return this.ops.insert(tableInfo.name, data);
  }

  find(email) {
    return this.ops.find(tableInfo.name, { email });
  }
}

export default new Users(tableInfo);
