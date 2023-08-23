const express = require("express");
const usuarioService = require('./usuarioService');
const axios = require("axios");
const router = express.Router();
const tiposEventos = require("../../Util/src/tiposEventos"); // Importa os tipos de eventos


class UsuarioController {

  constructor() {
    this.usuarioService = new usuarioService(); // Instancie a service
  }

  async obterTodos(req, res) {
    try {
      const usuarios = await this.usuarioService.obterTodosUsuarios();
      res.send(usuarios);
    } catch (error) {
      res.status(500).send({
        error: "Ocorreu um erro ao obter os usuários."
      });
    }
  }
      
  criar(req, res) {
    let novoUsuario;
    const { spotify_data } = req.body;
  
    this.usuarioService.criarUsuario(spotify_data)
      .then((usuario) => {
        novoUsuario = usuario;
        if (novoUsuario === null) {
          throw new Error("Usuário não criado corretamente.");
        }
        return this.sendUserLogado(novoUsuario);
      })
      .then(() => {
        res.status(200).send({ msg: novoUsuario });
      })
      .catch((error) => {
        res.status(500).send({
          error: `${error}`
        });
      });
  }
  
  async sendUserLogado(userLogado) {
    try {
      await axios.post('http://127.0.0.1:10000/eventos', {
        tipo: tiposEventos.USUARIO_LOGADO,
        dados: {
          userLogado
        }
      });
    } catch (error) {
      throw new Error("Erro ao enviar ao barramento de eventos.");
    }
  }
}

router.post("/eventos", (req, res) => {
  res.status(200).send({ msg: "Sucesso", resultado: req.body });
  console.log(req.body);
});

router.get("/", async (req, res) => {
  const controller = new UsuarioController();
  await controller.obterTodos(req, res);
});

router.post("/", async (req, res) => {
  const controller = new UsuarioController();
  controller.criar(req, res); 
});

module.exports = router;
