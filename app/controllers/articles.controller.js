const models = require("../models");
exports.getArticleById = async (req, res, next) => {
  const { article_id: articleId } = req.params;
  try {
    const article = await models.articles.selectArticleById(articleId);
    res.status(200).send({ article });
  } catch (error) {
    next({ error, type: "article" });
  }
};

exports.changeArticleVotes = async (req, res, next) => {
  const { article_id: articleId } = req.params;
  const { inc_votes } = req.body;
  try {
    if (!req.body.inc_votes) throw { status: 400, errMsg: "no inc_votes present" };
    const article = await models.articles.updateArticleVotes(articleId, inc_votes);
    res.status(200).send({ article });
  } catch (error) {
    next({ error, type: "article" });
  }
};

exports.getArticles = async (req, res, next) => {
  try {
    const articles = await models.articles.selectArticles();
    res.status(200).send({ articles });
  } catch (error) {
    next({ error, type: "article" });
  }
};
