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

  const watchOptions = { recursive: true, filter: /\.md$/ };
  const watcher = watch(files, watchOptions);

  watcher.on('change', function(event, fullFilepath) {
    const watchEvents = { remove, update };
    const filepath = fullFilepath
        .replace(process.cwd(), '')
        .replace(/^\/+/, '')
        .trim();
    watchEvents[event](filepath);
  });

  watcher.on('error', error);

  watcher.on('ready', ready.bind(null, config));
}