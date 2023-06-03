const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");
const moment = require('moment-timezone');
const Comentario = require('./comentario-model');

const app = express();
app.use(bodyParser.json());

const bdComentariosPorPost = {};

app.get('/posts/:idPost/comentarios', (req, res) => {
    res.send(bdComentariosPorPost[[req.params.idPost]] || [] )
}); 

app.put('/comentarios', (req, res) => {
    const { username, idPost, comentario} = req.body;
    const comentariosDoPost = bdComentariosPorPost[idPost] || [];
    const novo_cmt = new Comentario(comentario, username, moment().tz('America/Sao_Paulo').format('HH:mm:ss'));
    comentariosDoPost.push(novo_cmt);
    
    bdComentariosPorPost[idPost] = comentariosDoPost;
    res.status(201).send(comentariosDoPost);
});

app.listen(5003, (() => {
    console.log('Lembretes. Porta 5003');
}));


// const comentariosDoPostDoUsuario = bdComentariosPorPost[idPost]?.[username] ?? [];
// bdComentariosPorPost[idPost] = bdComentariosPorPost[idPost] ? bdComentariosPorPost[idPost] : {};
