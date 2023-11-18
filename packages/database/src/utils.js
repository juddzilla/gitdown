const emptyValues = [null, undefined];

export const arrayValueStatement = (table, data) => {
  const whereIn = keyEqualsOrIn(data);
  return `${table}.${whereIn}`;
};


export const keyEqualsStringArray = (data) => Object.keys(data)
  .map((key) => {
    const value = data[key];
    const val = Number.isInteger(value) ? value : `'${value}'`;
    if (truthyValue(value)) {
      return `${key} = ${val}`;
    }
  })
  .filter(Boolean)
  .join(',');

export const keyEqualsStringArrayAnd = (data) => Object.keys(data)
    .map((key) => {
      const value = data[key];
      const val = Number.isInteger(value) ? value : `'${value}'`;
      if (truthyValue(value)) {
        return `${key} = ${val}`;
      }
    })
    .filter(Boolean)
    .join(' AND ');

export const keyEqualsStringArrayLike = (data) => Object.keys(data)
    .map((key) => {
      const value = data[key];
      const val = Number.isInteger(value) ? value : `'%${value}%'`;
      if (truthyValue(value)) {
        return `${key} LIKE ${val}`;
      }
    })
    .filter(Boolean)
    .join(' AND ');

export const keyInStringArray = (data) => Object.keys(data)
  .map((key) => {
    const values = data[key].map((value) => {
      if (truthyValue(value)) {
        return `'${value}'`;
      }
    }).join(',');
    return `${key} IN (${values})`;
  })[0];

export const keyEqualsOrIn = (data) => Object.keys(data)
  .map((key) => {
    const value = data[key];
    const pair = { [key]: value };

    return Array.isArray(value) ? keyInStringArray(pair) : keyEqualsStringArray(pair);
  });

export const truthyValue = (value) => !!((Array.isArray(value) && value.length)
    || (!emptyValues.includes(value)));