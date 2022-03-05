const { PORT = 9090 } = process.env;
const app = require("./app/app.js");

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
