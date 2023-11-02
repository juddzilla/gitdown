import path from 'path';
import config from '../../../config.js';
import Markdown from '../interfaces/markdown';

import Utils from '../interfaces/utils';

const { workingDir } = config;

const handler = async (req, res) => {
  const directoryStart = path.join(workingDir, 'src', 'markdown', 'templates', '**', Markdown.fileName);
  const filepaths = await Markdown.Files(directoryStart);
  const rawFilenames = filepaths.map(Utils.FilepathToFilename);
  const formattedFilename = rawFilenames.map(Utils.SnakeCaseToCap);
  return res.send({ users: formattedFilename });
};

export const route = {
  handler,
  method: 'get',
  name: 'Templates',
  path: '/templates',
};

export default handler;
