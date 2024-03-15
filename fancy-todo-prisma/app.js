const express = require("express");
const router = require("./src/routes")

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(router)

module.exports = app;