const express = require("express");
const app = express();
const usuarioController  = require('./controller')

app.use('/usuarios', usuarioController)

app.listen(5001, () => {
  console.log("Users. Porta 5001");
});
