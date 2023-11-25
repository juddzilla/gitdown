import Domain from '../../interfaces/domain';

const handler = async (req, res) => {
  console.log('req.DATA', req.DATA);
  const documents = await Domain.Documents.List(req.DATA);
  return res.send(documents);
};

export const route = {
  handler,
  method: 'get',
  name: 'Documents',
  path: '/documents',
};

export default handler;
