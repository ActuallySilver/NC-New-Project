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
      case "23503":
        console.log(err.constraint);
        if (err.constraint === "comments_author_fkey") return res.status(404).send({ errMsg: "author not found" });
        if (err.constraint === "comments_article_id_fkey") return res.status(404).send({ errMsg: "article not found" });
      case "23502":
        return res.status(400).send({ errMsg: "required inputs not given" });
      default:
        console.log(err);
        break;
    }
  }
  next(err);
};
