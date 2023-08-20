const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/eventos', (req, res) => {
const evento = req.body;
//microsserviço de login
//axios.post("https://localhost:8888/login", evento);
//microserviço de usuários
axios.post('http://localhost:5001/eventos', evento);
//microserviço de posts
//axios.post('http://localhost:5002/eventos', evento);
//microserviço de comentários
//axios.post('http://localhost:5003/eventos', evento);
// //microserviço de curtidas
// axios.post('http://localhost:5004/eventos', evento);
res.status(200).send({ msg: "ok" });
});

app.listen(10000, () => {
console.log('Barramento de eventos. Porta 10000.')
})