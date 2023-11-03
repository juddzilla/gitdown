import path from 'path';

// import config from '../../../config.js';
import Database from '../../interfaces/database';
const { Queries } = Database;
import Markdown from '../../interfaces/markdown';

export default async function({ files }) {
  const fileName = '*.md';

  const directoryStart = path.join(files, '**', fileName);
  const filepaths = await Markdown.Files(directoryStart);

  filepaths.forEach((async (filepath) => {
    const markdown = await new Markdown.Handler(filepath)
    await markdown.init();
    const data = markdown.getMetadata();
    Queries.Populate({ ...data, filepath });
  }));
}