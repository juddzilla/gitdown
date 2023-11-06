import fs from 'fs';
import path from 'path';
import watch from 'node-watch';

// import config from '../../config.js';
import WatchEvents from './events/';

const {
  error,
  ready,
  remove,
  update,
} = WatchEvents;


export default function(config) {
  const { files } = config;

  if (!fs.existsSync(files)) {
    fs.mkdirSync(files, {recursive: true});
  }

  const watchOptions = { recursive: true, filter: /\.md$/ };
  const watcher = watch(files, watchOptions);

  watcher.on('change', function(event, fullFilepath) {
    const watchEvents = { remove, update };
    watchEvents[event](fullFilepath);
  });

  watcher.on('error', error);

  watcher.on('ready', ready.bind(null, config));
}