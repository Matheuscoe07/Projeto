const express = require("express");
const bodyParser = require("body-parser");
// const axios = require("axios");
const router = express.Router();
const app = express();
app.use(bodyParser.json());
const usuarioService = require('./service');

class UsuarioController {

   constructor() {
     this.usuarioService = usuarioService; // Instancie a service
   }

   async obterTodos(req, res) {
    try {
      const usuarios = await this.usuarioService.obterTodosUsuarios();
      res.send(usuarios);
    } catch (error) {
      res.status(500).send({ error: "Ocorreu um erro ao obter os usuários." });
    }
  }

   async criar(req, res) {
    try {
      const { spotify_data } = req.body;
      const novoUsuario = await this.usuarioService.criarUsuario(spotify_data);
      res.status(201).send(novoUsuario);
    } catch (error) {
      res.status(500).send({ error: "Ocorreu um erro ao criar o usuário." });
    }
  }
}

router.get("/", async (req, res) => {
   const controller = new UsuarioController();
   await controller.obterTodos(req, res);
 });

router.post("/", async (req, res) => {
  const controller = new UsuarioController();
  await controller.criar(req, res);
});

module.exports = router;
