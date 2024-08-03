const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');
 
const port = 3000;
const app = express();
 
app.listen(port, () =>{
  console.log(`Server is running in port: ${port}`)
})

app.get('/', (req,res) =>{
  res.send('Hello World')
})
 
// Parses the text as url encoded data

app.use(bodyParser.urlencoded({extended: true}))
// Parses the text as json
app.use(bodyParser.json());
 
app.use(api);