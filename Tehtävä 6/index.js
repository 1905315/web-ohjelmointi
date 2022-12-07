require("dotenv").config();
const express = require("express");
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const urheilijatRouter = require("./routers/urheilijat");
server.use("/api/urheilijat", urheilijatRouter);

const port = process.env.PORT;

server.listen(port, (err) => {
  if (err) {
    console.log("Server failed to start: " + err);
  } else {
    console.log("Server is running on port " + port);
  }
});
