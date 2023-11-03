import {
  find,
  getMany,
  insert,
  insertOneToMany,
  removeMany,
  update,
} from './operations.js';

export default class Base {
  constructor(props) {
    const { columns, name } = props;
    this.columns = columns;
    this.name = name;

    this.ops = {
      find: find.bind(this),
      getMany: getMany.bind(this),
      insert: insert.bind(this),
      insertOneToMany: insertOneToMany.bind(this),
      removeMany: removeMany.bind(this),
      update: update.bind(this),
    };
  }

  createTable() {

  }

  info() {
    return {
      columns: this.getColumns(),
      name: this.getName(),
    };
  }

  getColumns() {
    return this.columns;
  }

  getName() {
    return this.name;
  }
}
