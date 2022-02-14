const express = require("express");
const app = express();
const controllers = require("./controllers");

app.get("/api/topics", controllers.topics.getTopics);

app.all("*", controllers.errors.handle404);

module.exports = app;
