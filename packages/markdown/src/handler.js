import { readFile, writeFile } from 'fs/promises';
import fs from 'fs';
import FrontMatter from 'front-matter';
import { nanoid } from 'nanoid';

import Utils from './interfaces/utils';

const metadataComment = '<!-- GENERATED WITH GITDOWN; DO NOT CHANGE -->';

const cleanBody = (body) => {
  const commentMatch = new RegExp(metadataComment);
  return body
    .replace(commentMatch, '')
    .trim();
};

const createMetadataBlock = (stringifiedValues) => {
  const attributes = '---\n'.concat(stringifiedValues, '---\n');
  const commentBlock = metadataComment.concat('\n\n');
  return attributes.concat(commentBlock);
};

const stringifyMetadata = (attributes) => Object
  .keys(attributes)
  .reduce((accumulator, key) => {
    let acc = accumulator;
    acc += `${key}: `;
    if (!Array.isArray(attributes[key])) {
      acc += `${attributes[key]}`;
    } else {
      acc += '['.concat(attributes[key].join(', '), ']');
    }
    acc += '\n';
    return acc;
  }, '');

export default class MarkdownHandler {
  constructor(filepath) {
    this.filepath = filepath;
  }

  async createNewDocument() {
    this.body = '';
    this.metadata = {
      priority: '',
      project: '',
      status: '',
      tags: [],
      type: [],
      users: [],
    };
    await this.createNewId();
  }

  async createNewId() {
    this.setMetadata({ ...this.metadata, id: nanoid() });
    await this.saveFile();
  }

  filepathParts() {
    return Utils.RelativePath(this.filepath)
      .split('.')
      .shift()
      .split('/');
  }

  getMetadata() {
    return this.metadata;
  }

  getData() {
    return {
      body: this.body,
      metadata: this.metadata,
    };
  }

  async init() {
    try {
      const data = await readFile(this.filepath, 'utf8');
      const content = FrontMatter(data);
      const { attributes, body } = content;
      if (!Object.hasOwn(attributes, 'id')) {
        await this.createNewDocument();
      }

      const md = this.metadata ? this.metadata : attributes;
      this.body = cleanBody(body);
      this.setMetadata(md);
    } catch (e) {
      console.log('INIT', e);
      return false;
    }

  }

  async saveFile() {
    const { filepath, updated, ...rest } = this.metadata;

    const stringifiedMetadata = stringifyMetadata(rest);
    const metadataBlock = createMetadataBlock(stringifiedMetadata);
    const content = metadataBlock.concat(this.body);

    await writeFile(this.filepath, content);
  }

  setMetadata(data) {
    const stats = fs.statSync(this.filepath);
    this.metadata = {
      ...data,
      filepath: this.filepathParts(),
      updated: Math.round(stats.mtimeMs),
    };
  }
}