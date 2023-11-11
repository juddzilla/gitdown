const put = async(req, res) => {
  try {
    const { body, params } = req;

    req.DATA = {
      condition: params,
      values: body,
    };
  } catch (error) {
    console.warn('PUT ERROR', error);
    return res.status(500).send({ error: 'my bad' });
  }
};

export default put;
