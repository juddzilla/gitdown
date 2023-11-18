import path from 'path';
import Base from './base.js';

import configuration from '../interfaces/config';
import Utils from '../interfaces/utils';

export default class DocumentPaths extends Base {
  constructor(props) {
    super(props);
  }

  Create({ document_id }, { project, title }) {
    return super.Create({ document_id: document_id, filename: `${title}.md`, path: project });
  }

  async FindAndRemove(filepath) {
    const Locations = await Utils.Project_Title(filepath);
    const existing = super.Find({ filename: Locations.title, path: Locations.project });
    if (Object.keys(existing.results).length) {
      super.Remove({ document_id: existing.results.document_id });
      return existing.results.document_id;
    }
    return false;
  }

  async FullPath({ document_id }) {
    const config = await configuration.get();
    const DocumentPath = this.Find({ document_id });
    return path.join(config.projectsPath, DocumentPath.results.path, DocumentPath.results.filename);
  }

  async ProjectPath({ project }) {
    const config = await configuration.get();
    if (!project.trim().length) {
      return config.projectsPath;
    }

    return path.join(config.projectsPath, project.toString() || '');
  }

  async ToFullPath({ project, title }) {
    const config = await configuration.get();
    return path.join(config.projectsPath, project.toString() || '', title.toString());
  }

  async Update(documentId, filepath) {
    const Locations = await Utils.Project_Title(filepath);
    const existing = this.Find(documentId);

    if (!Object.keys(existing.results).length) {
      return this.Create(documentId, Locations);
    }
    return await super.Update(documentId, { filename: `${Locations.title}.md`, path: Locations.project });
  }
}
