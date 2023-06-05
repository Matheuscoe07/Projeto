const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const bdUsuarios = {};

app.get('/usuarios', (req, res) => {
    res.send(bdUsuarios)
}); 

app.post('/usuarios', (req, res) => {
    jsonSpotify = req.body.spotify_data
    console.log(jsonSpotify)
    bdUsuarios[jsonSpotify.id] = {
        username:jsonSpotify.email, nome:jsonSpotify.display_name
    }   

    res.status(201).send(bdUsuarios[jsonSpotify.id]);
});

app.listen(5001, (() => {
    console.log('Lembretes. Porta 5001');
    }));
