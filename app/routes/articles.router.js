const articlesRouter = require("express").Router();
const controllers = require("../controllers");

articlesRouter.get("/:article_id", controllers.articles.getArticleById);
module.exports = articlesRouter;
