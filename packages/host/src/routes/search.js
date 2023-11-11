import Domain from '../interfaces/domain';

const handler = (req, res) => {
if (Object.keys(req.DATA).length === 0) {
    res.status(204).send({});
  }

  const search = Domain.Search(req.DATA);
  res.send({ search });
};

export const route = {
  handler,
  method: 'get',
  name: 'Search',
  path: '/search',
};
export default handler;
