const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const usuarioController  = require('./usuarioController')

app.use(bodyParser.json());

app.use('/usuarios', usuarioController)

app.listen(5001, () => {
  console.log("Users. Porta 5001");
});
