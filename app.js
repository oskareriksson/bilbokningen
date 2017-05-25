const app = require("./server.js");
const server = require("http").Server(app);

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});