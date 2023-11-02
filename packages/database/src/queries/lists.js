import DistinctColumn from '../operations/distinct-column';
export const getDistinct = (tableName, column) => DistinctColumn(tableName, column);

const getDocumentsColumns = () => {
  return ['project'].reduce((acc, column) => {
    acc[column] = getDistinct('documents', column);
    return acc;
  }, {});
};

export default () => {
  const document = getDocumentsColumns();
  const tags = getDistinct('document_tags', 'tag');
  const users = getDistinct('document_users', 'user_id');

  return {
    ...document,
    tags,
    users,
  };
};
