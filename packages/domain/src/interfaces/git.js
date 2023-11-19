import { simpleGit } from 'simple-git';
import Configuration from './config';
const config = await Configuration.get();

const options = {
  baseDir: config.root,
  binary: 'git',
  maxConcurrentProcesses: 6,
  trimmed: false,
};

const git = simpleGit(options);

export default git;