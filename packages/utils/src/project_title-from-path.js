import configuration from './interfaces/config';

export default async (filepath) => {
  const Config = await configuration.get();
  const fileparts = filepath.replace(`${Config.projectsPath}/`, '').trim().split('/');

  if (fileparts.length === 1) {
    fileparts.unshift('');
  }
  const [project, filename] = fileparts;
  const title = filename.replace('.md', '');

  return {
    title,
    project,
  };
}