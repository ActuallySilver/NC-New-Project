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

exports.changeArticleVotes = async (req, res, next) => {
  if (!req.body.inc_votes) return next({ status: 400, errMsg: "no inc_votes present" });
  const { article_id: articleId } = req.params;
  const { inc_votes } = req.body;
  try {
    const article = await models.articles.updateArticleVotes(articleId, inc_votes);
    res.status(200).send({ article });
  } catch (error) {
    next(error);
  }
};

exports.getArticles = async (req, res, next) => {
  try {
    const articles = await models.articles.selectArticles();
    res.status(200).send({ articles });
  } catch (error) {
    next(error);
  }
};
