const express = require("express");
const axios = require("axios");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const Usuario = require('./model');

class UsuarioService {

  constructor() {
    this.bdUsuarios = {"oi": "oi"};
  }

  async obterTodosUsuarios() {
    return this.bdUsuarios;
  }

  async criarUsuario(spotifyData) {
    const novoUsuario = new Usuario(spotifyData.id, spotifyData.display_name, spotifyData.email, spotifyData.images[0]?.url, spotifyData.country, spotifyData.followers?.total);
    this.bdUsuarios[novoUsuario.id] = novoUsuario;

    return novoUsuario;
  }

}

module.exports = new UsuarioService(); // Exportar uma instância única