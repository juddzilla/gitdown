import path from 'path';

export default (filepath) => path.relative(process.cwd(), filepath);