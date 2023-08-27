const express = require("express");
const usuarioService = require('./usuarioService');
const router = express.Router();
const util = require("../../Util/src/util");
const ENUM = require("../../Util/src/enums");

class UsuarioController {

  constructor() {
    this.usuarioService = new usuarioService(); // Instancie a service
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
      if (novoUsuario === null) {
        throw new Error("Usuário não criado corretamente.");
      }
      const envio = await this.sendUserLogado(novoUsuario);
      if (!envio.status) {
        throw new Error(envio.msg);
      }
      res.status(200).send(novoUsuario);
    } catch (error) {
      res.status(500).send({ error: `${error}` });
    }
  }

  async sendUserLogado(userLogado) {
    let pacote = { tipo: ENUM.tiposEventos.USUARIO_LOGADO, dados: { userLogado } };
    return util.sendRequestPOST(`${ENUM.enderecosIP.SERVICO_BARRAMENTO}/eventos`, pacote);
  }
}

router.post("/eventos", (req, res) => {
  res.status(200).send({ msg: "Sucesso", resultado: req.body });
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
