const port = process.env.PORT || 4000;
const app = require("./server.js");
const server = require("http").Server(app);

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});