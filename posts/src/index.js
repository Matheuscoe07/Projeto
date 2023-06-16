const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());

const bdPostsDosUsuarios = {};

app.get('/usuarios/:username/posts', (req, res) => {
    res.send(bdPostsDosUsuarios[[req.params.username]] || [] )
}); 

app.put('/usuarios/:username/posts', async (req, res) => {
    const idPost = uuidv4();
    const { titulo, imagem } = req.body;
    const postsDoUsuario = bdPostsDosUsuarios[req.params.username] || [];
    postsDoUsuario.push({ [idPost]: { titulo, imagem } });
    bdPostsDosUsuarios[req.params.username] = postsDoUsuario;

    await axios.post('http://localhost:10000/eventos', {
        tipo: 'postCriado',
        dados: {
            username,
            titulo,
            imagem
        }
    })
    res.status(201).send(postsDoUsuario);
});

app.listen(5002, (() => {
    console.log('Posts. Porta 5002');
    }));