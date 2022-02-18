const articlesRouter = require("express").Router();
const controllers = require("../controllers");
articlesRouter.use(require("express").json());
articlesRouter.get("/", controllers.articles.getArticles);
articlesRouter.get("/:article_id", controllers.articles.getArticleById);
articlesRouter.patch("/:article_id", controllers.articles.changeArticleVotes);
articlesRouter.get("/:article_id/comments", controllers.comments.getCommentsByArticleID);
articlesRouter.post("/:article_id/comments", controllers.comments.PostCommentByArticleID);
module.exports = articlesRouter;
