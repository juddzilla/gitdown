import { Lists } from '../../database/queries/index.js';

class List {
  constructor() {
    this.observers = [];
    this.initiate();
  }

  add(cache, value) {
    if (!this.check(cache, value)) {
      this.update(cache, value);
    }
  }

  addObserver(o) {
    this.observers.push(o)
  }

  check(cache, value) {
    const values = this.data[cache];
    return values && values.includes(value);
  }

  get(cache) {
    const values = this.data[cache];
    return values || [];
  }

  getAll() {
    return this.data;
  }

  initiate() {
    this.data = Lists();
  }

  notifyObservers() {
    this.observers.forEach(o => o(this.data));
  }

  update(cache, value) {
    this.data[cache].push(value);
    this.notifyObservers();
  }
}

export default new List();

