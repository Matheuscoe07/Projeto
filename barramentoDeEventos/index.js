const express = require("express");
const bodyParser = require("body-parser");
const net = require("net");
const axios = require("axios");
const app = express();
const Util = require('../Util/util');

app.use(bodyParser.json());


app.post("/eventos", (req, res) => {
  const evento = req.body;
  //microsserviço de login
  // sendRequest(8888, 'https://127.0.0.1:8888/login', evento)
  
  //microserviço de usuários
  Util.sendRequest(5001, 'http://127.0.0.1:5001/usuarios/eventos', evento)
  
  //microserviço de posts
  Util.sendRequest(5002, 'http://127.0.0.1:5002/eventos', evento)
  
  //microserviço de comentários
  Util.sendRequest(5003, 'http://127.0.0.1:5003/eventos', evento)
  
  // //microserviço de curtidas
  Util.sendRequest(5004, 'http://127.0.0.1:5004/eventos', evento)

  res.status(200).send({ msg: "ok" });
});

app.listen(10000, () => {
  console.log("Barramento de eventos. Porta 10000.");
});
