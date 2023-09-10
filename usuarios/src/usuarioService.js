import express from "express";
import bodyParser from "body-parser";
import Usuario from './usuarioModel.js';
import ENUM from "../../Util/src/enums.js";
import util from "../../Util/src/util.js";

const app = express();
app.use(bodyParser.json());

export default class UsuarioService {

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
      const novoUsuario = new Usuario(spotifyData.id, spotifyData.display_name, spotifyData.email, spotifyData.images[1]?.url, spotifyData.country, spotifyData.followers?.total, spotifyData.product, spotifyData.external_urls.spotify, spotifyData.href);
      if(novoUsuario.checkUser()){
        this.bdUsuarios[novoUsuario.id] = {...novoUsuario};
        console.log(this.bdUsuarios)
        return novoUsuario;
      }else{
        return null;
      }
  }

  async sendUserAuth(tokens, usuario) {
    let jsonData = { tipo: ENUM.tiposEventos.USUARIO_LOGADO, dados: { ...usuario, tokens } };
    return util.sendRequestPOST(`${ENUM.enderecosIP.SERVICO_BARRAMENTO}/eventos`, jsonData);
  }

}