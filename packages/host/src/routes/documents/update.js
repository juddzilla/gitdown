import Domain from '../../interfaces/domain';

const handler = async (req, res) => {
  try {
    const updated = await Domain.Documents.Update(req.DATA);
    return res.send({ updated });
  } catch (err) {
    console.warn('UPD err', err);
    return res.send({ updated: false });
  }
};

export const route = {
  handler,
  method: 'put',
  name: 'DocumentUpdate',
  path: '/documents/:id',
};

export default handler;
