import express from "express";
import UsuarioService from './usuarioService.js';

const router = express.Router();

class UsuarioController {

  constructor() {
    this.usuarioService = new UsuarioService(); // Instancie a service
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
      const { tokens, spotify_data } = req.body;
      console.log('spotify_data: ', spotify_data);
      const novoUsuario = await this.usuarioService.criarUsuario(spotify_data);
      if (novoUsuario === null) {
        throw new Error("Usuário não criado corretamente.");
      }
      const envioBarramentos = await this.usuarioService.sendUserAuth(tokens, novoUsuario);
      if (!envioBarramentos.status) {
        throw new Error(envioBarramentos.msg);
      }
      res.status(200).send({ evento: envioBarramentos.data.evento });
    } catch (error) {
      res.status(500).send({ error: `${error}` });
    }
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

export { UsuarioController, router };