const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const bdUsuarios = {};

app.get('/usuarios', (req, res) => {
    res.send(bdUsuarios)
}); 

app.post('/usuarios', async (req, res) => {
    jsonSpotify = req.body.spotify_data
    console.log(jsonSpotify)
    bdUsuarios[jsonSpotify.id] = {
        username:jsonSpotify.email, nome:jsonSpotify.display_name
    }   

    await axios.post('http://localhost:10000/eventos', {
        tipo:'usuarioLogado',
        dados:{
            jsonSpotify
        }
    })

    res.status(201).send(bdUsuarios[jsonSpotify.id]);
});

app.post("/eventos", (req, res) => {
    console.log(req.body);
    res.status(200).send({ msg: "ok" });
    });

app.listen(5001, (() => {
    console.log('Usuários. Porta 5001');
    }));
