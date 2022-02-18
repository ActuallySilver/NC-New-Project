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
    next({ error, type: "comment" });
  }
};
exports.PostCommentByArticleID = async (req, res, next) => {
  try {
    const { article_id: articleId } = req.params;
    const { body, username } = req.body;
    const comment = await models.comments.insertCommentByArticleID(articleId, username, body);
    res.status(201).send({ comment });
  } catch (error) {
    next({ error, type: "article" });
  }
};
exports.removeCommentByID = async (req, res, next) => {
  try {
    const { comment_id } = req.params;
    await models.comments.deleteCommentByID(comment_id);
    res.status(204).send();
  } catch (error) {
    next({ error, type: "comment" });
  }
};
