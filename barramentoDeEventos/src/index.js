const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const barramentoController  = require('./barramentoController')

app.use(bodyParser.json());

app.use('/eventos', barramentoController)

app.listen(10000, () => {
  console.log("Barramento de eventos. Porta 10000.");
});
