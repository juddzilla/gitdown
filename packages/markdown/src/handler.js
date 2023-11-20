import { writeFile } from 'fs/promises';
import fs from 'fs';
import FrontMatter from 'front-matter';
import { nanoid } from 'nanoid';

import Utils from './interfaces/utils';
import Util from './util';
import Database from "gitdown-domain/src/interfaces/database.js";
import path from "path";

const {
  cleanBody,
  createMetadataBlock,
} = Util;


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
    if (!fs.existsSync(this.filepath)) {
      this.id = nanoid();
    }
  }

  async createFile({ body, metadata }) {
    // const FilePath = await Database.Models.DocumentPath.ToFullPath({ project: metadata.project, title: `${metadata.title}.md` });
    // this.filepath
    const ProjectPath = await Database.Models.DocumentPath.ProjectPath({ project: metadata.project });
    fs.mkdirSync(path.dirname(ProjectPath), { recursive: true });
    if (fs.existsSync(this.filepath)) {
      return { error: `A document name ${metadata.title} that name already exists in ${metadata.project}` };
    }

    const now = new Date().getTime();
    this.metadata = {
      ...metadata,
      created: now,
      id: this.id,
      updated: now,
    };
    this.body = cleanBody(body);
    await this.saveFile();
    return this.id;
  }

  async createNewDocument() {
    this.body = '';
    this.metadata = {
      archived: false,
      due: 0,
      priority: '',
      project: '',
      status: '',
      tags: [],
      title: '',
      type: [],
      users: [],
    };
    await this.createNewId();
  }

  async createNewId() {
    await this.setMetadata({ ...this.metadata, id: nanoid() });
    await this.saveFile();
  }

  fileId() {
    return this.id;
  }

  async getData() {
    if (!this.body && !this.metadata) {
      await this.init();
    }
    return {
      body: this.body,
      metadata: this.metadata,
    };
  }

  async init() {
    try {
      const data = await fs.readFileSync(this.filepath);
      const content = FrontMatter(data.toString());
      const { attributes, body } = content;
      if (!Object.hasOwn(attributes, 'id')) {
        await this.createNewDocument();
      }

      const md = this.metadata ? this.metadata : attributes;

      this.body = cleanBody(body);
      await this.setMetadata(md);
    } catch (e) {
      console.warn('INIT error', e);
      return false;
    }

  }

  async saveFile() {
    const { filepath, updated, ...rest } = this.metadata;

    const stringifiedMetadata = stringifyMetadata(rest);
    const metadataBlock = createMetadataBlock(stringifiedMetadata);
    const content = metadataBlock.concat(this.body);

    try {
      await writeFile(this.filepath, content);
    } catch (err) {
      console.warn('WRITE ERR', err);
    }
  }

  async setMetadata(data) {
    const stats = fs.statSync(this.filepath);
    const fileNameData = await Utils.Project_Title(this.filepath);
    this.metadata = {
      ...data,
      ...fileNameData,
      created: Math.round(stats.birthtime),
      updated: Math.round(stats.mtimeMs),
    };
  }

  async updateFile({ body, metadata }) {
    await this.setMetadata(metadata);
    this.body = body;
    await this.saveFile();
  }
}
