import Domain from '../../interfaces/domain';

const handler = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.send({ error: 444 });
  }

  const document = await Domain.Documents.Find({ document_id: id });
  return document;
};

export const route = {
  handler,
  method: 'get',
  name: 'DocumentById',
  path: '/documents/:id',
};

export default handler;
