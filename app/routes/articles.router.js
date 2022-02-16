const articlesRouter = require("express").Router();
const controllers = require("../controllers");
articlesRouter.use(require("express").json());
articlesRouter.all("/:article_id", controllers.articles.checkArticleExists);
articlesRouter.get("/:article_id", controllers.articles.getArticleById);
articlesRouter.patch("/:article_id", controllers.articles.changeArticleVotes);
module.exports = articlesRouter;
