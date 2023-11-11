const data = (req, res, done) => {
  req.DATA = {
    ...req.params,
    ...req.query,
  };

  done();
};

export default data;
