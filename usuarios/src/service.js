const express = require("express");
const axios = require("axios");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const Usuario = require('./model');

class UsuarioService {

  constructor() {
    if (UsuarioService.instance) {
      return UsuarioService.instance;
    }
    this.bdUsuarios = {};
    UsuarioService.instance = this;
  }

  async obterTodosUsuarios() {
    return this.bdUsuarios;
  }

  async criarUsuario(spotifyData) {
      const novoUsuario = new Usuario(spotifyData.id, spotifyData.display_name, spotifyData.email, spotifyData.images[0]?.url, spotifyData.country, spotifyData.followers?.total);
      if(novoUsuario.checkUser()){
        this.bdUsuarios[novoUsuario.id] = novoUsuario;
        return novoUsuario;
      }else{
        return null;
      }
  }

}

module.exports = UsuarioService;