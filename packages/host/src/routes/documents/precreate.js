import Domain from '../../interfaces/domain';

const handler = async (req, res) => {
  const { project, type } = req.DATA;
  try {
    const templates = await Domain.Documents.Create.Options({ project, type });
    return res.send(templates);
  } catch (err) {
    console.warn('UPD err', err);
    return res.send({ updated: false });
  }
};

export const route = {
  handler,
  method: 'get',
  name: 'DocumentPreCreate',
  path: '/documents/create',
  schema: {
    querystring: {
      properties: {
        project: { type: 'string' },
        type: { type: 'string' },
      },
      type: 'object',
    },
  },
};
