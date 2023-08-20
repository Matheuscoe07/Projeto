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
        nome:jsonSpotify.display_name, fotoPerfil:jsonSpotify.images[0].url, nac:jsonSpotify.country,
        follows:jsonSpotify.followers.total
    }  
    console.log(bdUsuarios[jsonSpotify.id].nome, bdUsuarios[jsonSpotify.id].fotoPerfil, 
        bdUsuarios[jsonSpotify.id].nac, 
        bdUsuarios[jsonSpotify.id].follows) 

    await axios.post('http://localhost:10000/eventos', {
        tipo:'usuarioLogado',
        dados:{
            jsonSpotify
        }
    })
    res.status(201).send(bdUsuarios[jsonSpotify.id]);
});

app.listen(5001, (() => {
    console.log('Users. Porta 5001');
    }));
