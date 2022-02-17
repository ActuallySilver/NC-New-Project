const articlesRouter = require("express").Router();
const controllers = require("../controllers");
articlesRouter.use(require("express").json());
articlesRouter.get("/:article_id", controllers.articles.getArticleById);
articlesRouter.patch("/:article_id", controllers.articles.changeArticleVotes);
articlesRouter.get("/:article_id/comments", controllers.comments.getCommentsByArticleID);
module.exports = articlesRouter;
