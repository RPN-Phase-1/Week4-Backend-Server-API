const express = require('express');
const api = require('./api');

const port = 3000;
const app = express();

app.listen(port, function () {
    console.log("Server is listening at port:" + port);
});

// Parses the text as url encoded data
app.use(express.urlencoded({ extended: true }));

// Parses the text as json
app.use(express.json());

app.use('/api', api);