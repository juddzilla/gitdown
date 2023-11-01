import path from 'path';

import Build from './src/build';
import './src/connection';

const tablePath = path.resolve(process.cwd(), 'src', 'tables', '*.json')
console.log('tablePAth', tablePath);
Build(tablePath);

