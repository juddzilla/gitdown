import Domain from '../../interfaces/domain';

const handler = async (req, res) => {
  const documents = await Domain.Documents.List();
  return res.send(documents);
};

export const route = {
  handler,
  method: 'get',
  name: 'Documents',
  path: '/documents',
};

export default handler;
