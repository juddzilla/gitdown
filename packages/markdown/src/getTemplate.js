import fs from 'fs';
import path, { dirname } from 'path';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import FrontMatter from 'front-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));

import Util from './util';

const templateMap = {
  bug: './templates/Bug.md',
  epic: './templates/Epic.md',
  metadata: './templates/metadata.md',
  task: './templates/Task.md',
  'use-case': './templates/Use-Case.md',
};

export default async (type) => {
  const file = path.resolve(__dirname, templateMap[type.toLowerCase()]);
  const defaultMetadata = path.resolve(__dirname, templateMap.metadata);
  // const template = await import(file);
  const data = await fs.readFileSync(file);
  const metadataFile = await fs.readFileSync(defaultMetadata);
  const content = FrontMatter(data.toString());
  const metadataContent = FrontMatter(metadataFile.toString());
  const { body } = content;
  const { attributes } = metadataContent;

  return {
    attributes: { ...attributes, type },
    body: Util.cleanBody(body)
  };
}
