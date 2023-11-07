// import Lists from './src/queries/lists.js';
// import Populate from './src/queries/populate.js';
// import Search from './src/queries/search.js';
// import Update from './src/queries/update.js';

import Initialize from './src/instance/init';
import Queries from "./src/queries/index.js";
import Models from './src/models/index.js';

export default async () => {
  await Initialize();
  return {
    // Lists,
    // Populate,
    Models,
    Queries,
    // Search,
    // Update,
  };
}
