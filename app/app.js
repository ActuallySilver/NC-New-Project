const express = require("express");
const controllers = require("./controllers");
const app = express();
const apiRouter = require("./routes/api.router");
app.use("/api", apiRouter);
//path not found
app.all("*", controllers.errors.handle404);

const { PORT = 9090 } = process.env;

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));

module.exports = app;
