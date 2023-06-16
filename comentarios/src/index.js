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

//fml fiz username e idPost ser parâmetros da requisição e mudei um pouco a lógica aq
//qualquer coisa a gnt reverte as mudanças
app.put('/usuarios/:username/posts/:idPost/comentarios', async (req, res) => {
    const { comentario } = req.body;
    const username = req.params.username;
    const idPost = req.params.idPost;
    const comentariosDoPost = bdComentariosPorPost[idPost] || [];
    const novo_cmt = new Comentario(comentario, username, moment().tz('America/Sao_Paulo').format('HH:mm:ss'));
    comentariosDoPost.push(novo_cmt);

    await axios.post('https://localhost:10000/eventos', {
        tipo:'comentarioCriado',
        dados:{
            username,
            idPost,
            comentario
        }
    })
    
    bdComentariosPorPost[idPost] = comentariosDoPost;
    res.status(201).send(comentariosDoPost);
});

app.post("/eventos", (req, res) => {
    console.log(req.body);
    res.status(200).send({ msg: "ok" });
    });

app.listen(5003, (() => {
    console.log('Comentários. Porta 5003');
}));


// const comentariosDoPostDoUsuario = bdComentariosPorPost[idPost]?.[username] ?? [];
// bdComentariosPorPost[idPost] = bdComentariosPorPost[idPost] ? bdComentariosPorPost[idPost] : {};
