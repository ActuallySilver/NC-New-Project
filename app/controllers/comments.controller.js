const models = require("../models");
exports.getCommentsByArticleID = async (req, res, next) => {
  try {
    const { article_id: articleId } = req.params;
    const [comments] = await Promise.all([
      models.comments.selectCommentsByArticleID(articleId),
      models.articles.selectArticleById(articleId),
    ]);
    res.status(200).send({ comments });
  } catch (error) {
    next(error);
  }
};
