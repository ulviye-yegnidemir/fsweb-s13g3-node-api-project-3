const express = require('express');
const  {logger} = require("./middleware/middleware");
const usersRouter = require("./users/users-router");
const server = express();
server.use(express.json());
server.use(logger);
server.use("/api/users",usersRouter);
// ekspres'in varsayılan olarak istek gövdelerinde JSON'u ayrıştıramayacağını unutmayın

// global ara yazılımlar ve kullanıcı routelarının buraya bağlanması gerekir

server.get('/', (req, res) => {
  res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
});

module.exports = server;
