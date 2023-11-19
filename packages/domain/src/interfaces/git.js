import { simpleGit } from 'simple-git';
import Configuration from './config';
import Utils from './utils';

const config = await Configuration.get();

const options = {
  baseDir: config.root,
  binary: 'git',
  maxConcurrentProcesses: 6,
  trimmed: false,
};

const projectFile = (filepath) => {
  const ProjectTitle = Utils.Project_Title(filepath);
  const { project, title } = ProjectTitle;
  return `${ project }: ${ title }`;
};

class Git {
  constructor() {
    this.git = simpleGit(options);
  }

  async Add({ action, filepath }) {
    try {
      await Promise.all([
        this.git.add(filepath),
        this.git.commit(`${action} ${projectFile(filepath)}`),
        this.git.push(),
      ]);
      return true;
    } catch (err) {
      console.warn('Git Update File Err ', err);
      return false;
    }
  }

  async UpdateFile(filepath) {
    return this.Add({ action: 'Update', filepath });
  }

  async RemoveFile(filepath) {
    return this.Add({ action: 'Remove', filepath });
  }
}

export default new Git();