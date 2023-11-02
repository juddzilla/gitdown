import path from 'path';

import Markdown from '../interfaces/markdown';

export default {
  getFile: async (filepath) => {
    const dirFilepath = path.join(process.cwd(), filepath);
    const file = await new Markdown.Handler(dirFilepath);
    await file.init();
    return file.getData();
  },
  updateFile: async (filepath, data) => {
    const dirFilepath = path.join(process.cwd(), filepath);
    const file = await new Markdown.Handler(dirFilepath);

    await file.init(data);
    return await file.saveFile();
  },
};
