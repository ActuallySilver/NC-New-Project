exports.handle404 = (req, res) => {
  res.status(404).send({ errMsg: "path not found" });
};
exports.handleCustom = (err, req, res, next) => {
  if (err.errMsg) {
    return res.status(err.status).send({ errMsg: err.errMsg });
  }
  next(err);
};
exports.handlePsql = (err, req, res, next) => {
  if (err.code) {
    switch (err.code) {
      case "22P02":
        return res.status(400).send({ errMsg: "invalid article id" });
      default:
        console.log(err.code);
        break;
    }
  }
  next(err);
};
