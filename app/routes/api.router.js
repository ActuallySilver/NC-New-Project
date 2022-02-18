const apiRouter = require("express").Router();
const routers = require("./");
const controllers = require("../controllers");

//Extra Routers
apiRouter.use("/topics", routers.topics);
apiRouter.use("/articles", routers.articles);
apiRouter.use("/users", routers.users);
apiRouter.use("/comments", routers.comments);

//All okay check for general API connection
apiRouter.get("/", controllers.api.allOkay);

//Errors
apiRouter.use(controllers.errors.handleCustom);
apiRouter.use(controllers.errors.handlePsql);

module.exports = apiRouter;
