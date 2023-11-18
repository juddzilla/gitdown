import Domain from '../../interfaces/domain';

const handler = async (req, res) => {
  try {
    const document = await Domain.Documents.Create.Submit(req.DATA);
    console.log('document', document);
    return res.send(document);
  } catch (err) {
    console.warn('Create error', err);
    return res.send({ created: false });
  }
};

export const route = {
  handler,
  method: 'post',
  name: 'DocumentCreate',
  path: '/documents/create',
};

export default handler;
