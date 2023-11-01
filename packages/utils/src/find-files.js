import glob from 'glob';

export default async (directoryStart) => {
  try {
    return await glob.sync(directoryStart);
  } catch (err) {
    console.warn('find files err', err);
    return `Find files error: ${err}`;
  }
};
