import fs from "fs";
import Database from '../interfaces/database';
import Markdown from '../interfaces/files';

export default async (filepath) => {
  const markdown = new Markdown.Handler(filepath);
  await markdown.init();
  const data = (await markdown.getData()).metadata;
  const {
    tags,
    users,
    ...rest
  } = data;

  const { id } = rest;

  const existingDocumentWithId = Database.Models.DocumentPath.Find({ document_id: data.id });
  const { filename, path } = existingDocumentWithId;
  const existingDocumentFilepath = [path, filename].join('/');
  // return;
  if (existingDocumentWithId && existingDocumentFilepath !== filepath) {
    const updated = fs.statSync(filepath);
    const existing = fs.statSync(existingDocumentFilepath);
    const updatedFileIsNewer = updated.birthtimeMs > existing.birthtimeMs;

    if (updatedFileIsNewer) {
      await markdown.createNewId();
    } else {
      const existingMarkdown = await new Markdown.Handler(existingDocumentFilepath);
      await existingMarkdown.init();
      await existingMarkdown.createNewId();
    }
  }

  try {
    await Database.Models.Documents.Update(id, rest);
    await Database.Models.DocumentPath.Update(id, filepath);
    await Database.Models.DocumentTags.Update(id, tags);
    await Database.Models.DocumentUsers.Update(id, users);
    return id;
  } catch (error) {
    return { error };
  }
}