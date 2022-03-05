const express = require("express");
const controllers = require("./controllers");
const app = express();
const apiRouter = require("./routes/api.router");
app.use("/api", apiRouter);
//path not found
app.all("*", controllers.errors.handle404);

module.exports = app;
