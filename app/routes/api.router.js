const apiRouter = require("express").Router();
const topicsRouter = require("./topics.router");
const articlesRouter = require("./articles.router");
const controllers = require("../controllers");
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.get("/", controllers.api.allOkay);

apiRouter.use(controllers.errors.handleCustom);
apiRouter.use(controllers.errors.handlePsql);

module.exports = apiRouter;
