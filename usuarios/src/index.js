const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const bdUsuarios = {};

app.get('/usuarios', (req, res) => {
    res.send(bdUsuarios)
}); 

app.put('/usuarios', (req, res) => {
    const { username, nome, genero } = req.body;
    bdUsuarios[username] = {
        username, nome, genero
    }   

    res.status(201).send(bdUsuarios[username]);
});

app.listen(5001, (() => {
    console.log('Lembretes. Porta 5001');
    }));