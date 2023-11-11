import Database from '../interfaces/database.js';

export default (data) => {
  const params = Object.keys(data).reduce((acc, key) => {
    const value = query[key];
    acc[key] = value.includes(',') ? value.split(',') : value;
    return acc;
  }, {});

  const search = Database.Queries.Search(params);
  
  return { search };
};