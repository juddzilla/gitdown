import Utils from '../interfaces/utils';
import Markdown from '../interfaces/markdown.js';

import Populate from './populate';

export default async (start) => {
  const filepaths = await Utils.FindFiles(start);
  filepaths.forEach((async (filepath) => {
    const markdown = await new Markdown.Handler(filepath)
    await markdown.init();
    const data = (await markdown.getData()).metadata;
    Populate({ ...data, filepath });
  }));
}