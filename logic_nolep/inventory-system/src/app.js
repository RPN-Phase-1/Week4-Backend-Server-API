const express = require("express");
const router = require("./routes")

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api', router);

app.use(router)

module.exports = app;