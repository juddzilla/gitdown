import fs from 'fs';
import Database from '../interfaces/database';
import Markdown from '../interfaces/markdown.js';

export default async (filepath) => {
  const markdown = new Markdown.Handler(filepath);
  await markdown.init();
  const data = (await markdown.getData()).metadata;

  console.log('data', data);
  const {
    tags,
    users,
    ...rest
  } = data;

  const { id } = rest;

  const existingDocumentWithId = await Database.Models.DocumentPath.Find({ document_id: id});
  if (Object.keys(existingDocumentWithId.results).length) {
    const { filename, path } = existingDocumentWithId.results;
    const existingDocumentFilepath = await Database.Models.DocumentPath.ToFullPath({ project: path, title: filename });
    if (fs.existsSync(existingDocumentFilepath)) {
      if (existingDocumentFilepath !== filepath) {
        const updated = fs.statSync(filepath);
        const existing = fs.statSync(existingDocumentFilepath);
        const updatedFileIsNewer = updated.birthtimeMs > existing.birthtimeMs;

        if (updatedFileIsNewer) {
          await markdown.createNewId();
          return;
        } else {
          const existingMarkdown = await new Markdown.Handler(existingDocumentFilepath);
          await existingMarkdown.init();
          await existingMarkdown.createNewId();
        }
      }
    }
  }

  try {
    await Database.Models.DocumentPath.Update({ document_id: id }, filepath);
    await Database.Models.Documents.Update({ id }, rest);
    await Database.Models.DocumentTags.Update({ document_id: id }, tags);
    await Database.Models.DocumentUsers.Update({ document_id: id }, users);
    return id;
  } catch (error) {
    return { error };
  }
}