const express = require("express");
const bodyParser = require("body-parser");
const net = require("net");
const axios = require("axios");
const app = express();

app.use(bodyParser.json());

function checkPort(port) {
  return new Promise((resolve, reject) => {
    const client = net.createConnection(port, "127.0.0.1", () => {
      client.end();
      resolve(true);
    });
    client.on("error", () => {
      resolve(false);
    });
  });
}

async function sendRequest(port, strRequest, evento) {
  const isPortOpen = await checkPort(port);
  if (isPortOpen) {
    axios.post(strRequest, evento);
  } else {
    console.log(`Porta ${port} não está disponível`);
  }
}

app.post("/eventos", (req, res) => {
  const evento = req.body;
  //microsserviço de login
  sendRequest(8888, 'https://localhost:8888/login', evento)
  
  //microserviço de usuários
  sendRequest(5001, 'http://localhost:5001/eventos', evento)
  
  //microserviço de posts
  sendRequest(5002, 'http://localhost:5002/eventos', evento)
  
  //microserviço de comentários
  sendRequest(5003, 'http://localhost:5003/eventos', evento)
  
  // //microserviço de curtidas
  sendRequest(5004, 'http://localhost:5004/eventos', evento)

  res.status(200).send({ msg: "ok" });
});

app.listen(10000, () => {
  console.log("Barramento de eventos. Porta 10000.");
});
