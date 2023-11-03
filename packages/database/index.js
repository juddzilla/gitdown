import Lists from './src/queries/lists.js';
import Populate from './src/queries/populate.js';
import Search from './src/queries/search.js';
import Update from './src/queries/update.js';

import Queries from "./src/queries/index.js";

import Models from './src/models/index.js';

import Initialize from './src/instance/init';

export const initialize = Initialize;

export default {
  Lists,
  Populate,
  Models,
  Queries,
  Search,
  Update,
};
