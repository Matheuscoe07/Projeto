const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const bdUsuarios = {};

app.get('/usuarios', (req, res) => {
    res.send(bdUsuarios)
}); 

app.put('/usuarios', async (req, res) => {
    const { username, nome, genero } = req.body;
    bdUsuarios[username] = {
        username, nome, genero
    }; 

    await axios.post('http://localhost:10000/eventos', {
        tipo: 'usuarioCriado',
        dados: {
            username,
            nome,
            genero
        }
    })
    res.status(201).send(bdUsuarios[username]);
});

app.post("/eventos", (req, res) => {
    console.log(req.body);
    res.status(200).send({ msg: "ok" });
    });

app.listen(5001, (() => {
    console.log('Usuários. Porta 5001');
    }));