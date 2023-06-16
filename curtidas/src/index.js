const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const bdCurtidasPorPost = {};

function manage_curtidas(interacao, username, curtidasDoPost) {
    const indice = curtidasDoPost.indexOf(username);
    if(indice !== -1){
        if(interacao == false){
            curtidasDoPost.splice(indice, 1);
        } 
    }else if(interacao == true){
        curtidasDoPost.push(username)
    }

    return curtidasDoPost
}

app.get('/posts/:idPost/curtidas', (req, res) => {
    res.send(bdCurtidasPorPost[[req.params.idPost]] || [] )
}); 

app.put('/curtidas', (req, res) => {
    const { username, idPost, interacao} = req.body;
    let curtidasDoPost = bdCurtidasPorPost[idPost] || [];
    curtidasDoPost = manage_curtidas(interacao, username, curtidasDoPost)
    bdCurtidasPorPost[idPost] = curtidasDoPost;
    res.status(201).send(curtidasDoPost);
});

app.post("/eventos", (req, res) => {
    console.log(req.body);
    res.status(200).send({ msg: "ok" });
    });

app.listen(5004, (() => {
    console.log('Curtidas. Porta 5004');
}));
