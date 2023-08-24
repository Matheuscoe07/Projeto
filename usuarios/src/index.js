const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const usuarioController  = require('./usuarioController');
const ENUM  = require('../../Util/src/enums');

app.use(bodyParser.json());

app.use('/usuarios', usuarioController)

app.listen(ENUM.portas.PORTA_USUARIO, () => {
  console.log(`Usuários: Porta ${ENUM.portas.PORTA_USUARIO}`);
});


