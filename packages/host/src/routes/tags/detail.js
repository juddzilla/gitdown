import Domain from '../../interfaces/domain';

const handler = async (req, res) => {
  const { name } = req.params;
  const documents = await Domain.DocumentTags.Where({ tag: name });
  return res.send(documents);
};

export const route = {
  handler,
  method: 'get',
  name: 'Tag',
  path: '/tags/:name',
};

export default handler;
