import { simpleGit } from 'simple-git';
import Configuration from './config';
import Utils from './utils';

const config = await Configuration.get();

const options = {
  baseDir: config.root,
  binary: 'git',
  maxConcurrentProcesses: 1,
  trimmed: false,
};

const projectFile = async (filepath) => {
  const ProjectTitle = await Utils.Project_Title(filepath);
  const { project, title } = ProjectTitle;
  return `${ project }: ${ title }`;
};

class Git {
  constructor() {
    this.git = simpleGit(options);
  }

  async Add({ action, filepath }) {
    const message =  `${action} --> ${ await projectFile(filepath)}`;
    try {
      await this.git.add(filepath);
      await this.git.commit(message);
      await this.git.push();
      return true;
    } catch (err) {
      console.warn('Git Update File Err ', action, err);
      return false;
    }
  }

  async UpdateFile(filepath) {
    return await this.Add({ action: 'Update', filepath });
  }

  async RemoveFile(filepath) {
    return await this.Add({ action: 'Remove', filepath });
  }
}

export default new Git();