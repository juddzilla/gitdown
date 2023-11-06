import chokidar from 'chokidar';
import { paths } from './routes';
import buildPublicFile from './public';

const watcher = chokidar.watch(paths);

watcher
    .on('add', buildPublicFile)
    .on('change', buildPublicFile)
    .on('unlink', buildPublicFile);