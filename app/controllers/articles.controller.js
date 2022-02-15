const models = require("../models");
exports.getArticleById = async (req, res, next) => {
  const { article_id: articleId } = req.params;
  try {
    const article = await models.articles.selectArticleById(articleId);
    res.status(200).send({ article });
  } catch (error) {
    next(error);
  }
};
