exports.handle404 = (req, res) => {
  res.status(404).send({ errMsg: "path not found" });
};
exports.handleCustom = (err, req, res, next) => {
  const { error } = err;
  if (error.errMsg) {
    return res.status(error.status).send({ errMsg: error.errMsg });
  }
  next(err);
};
exports.handlePsql = (err, req, res, next) => {
  const { error, type } = err;
  if (error.code) {
    switch (error.code) {
      case "22P02":
        if (type === "article") return res.status(400).send({ errMsg: "invalid article id" });
        if (type === "comment") return res.status(400).send({ errMsg: "invalid comment id" });
        return res.status(400).send({ errMsg: "invalid id" });
      case "23503":
        if (error.constraint === "comments_author_fkey") return res.status(404).send({ errMsg: "author not found" });
        if (error.constraint === "comments_article_id_fkey") return res.status(404).send({ errMsg: "article not found" });
      case "23502":
        return res.status(400).send({ errMsg: "required inputs not given" });
      default:
        console.log(error);
        break;
    }
  }
  next(err);
};
