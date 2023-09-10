const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const frontendController  = require('./frontendController');
const ENUM  = require('../../src/Util/enums');


app.use(bodyParser.json());

app.use('/frontend', frontendController)

app.listen(ENUM.portas.PORTA_FRONTEND, () => {
  console.log(`frontend: Porta ${ENUM.portas.PORTA_FRONTEND}`);
});

