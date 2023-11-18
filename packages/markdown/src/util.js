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

export default {
  cleanBody,
  createMetadataBlock,
  metadataComment,
}
