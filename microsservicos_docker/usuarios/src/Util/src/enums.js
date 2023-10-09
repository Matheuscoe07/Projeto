export default class ENUM {
  
  static get tiposEventos() {
    return {
      USUARIO_LOGADO: "usuario_logado",
      POST_CRIADO: "post_criado"
    };
  }

  static get portas() {
    return {
      PORTA_USUARIO: 5001,
      PORTA_POSTS: 5002,
      PORTA_BARRAMENTO: 10000,
      PORTA_API_SPOTIFY: 8888,
      PORTA_FRONTEND: 5007,
    };
  }

  static get enderecosIP() {
    return {
      SERVICO_USUARIO: `http://127.0.0.1:${ENUM.portas.PORTA_USUARIO}`,
      SERVICO_POSTS: `http://127.0.0.1:${ENUM.portas.PORTA_POSTS}`,
      SERVICO_BARRAMENTO: `http://127.0.0.1:${ENUM.portas.PORTA_BARRAMENTO}`,
      SERVICO_API_SPOTIFY: `http://127.0.0.1:${ENUM.portas.PORTA_API_SPOTIFY}`,
      SERVICO_API_SPOTIFY2: `http://localhost:${ENUM.portas.PORTA_API_SPOTIFY}`,
      SERVICO_FRONTEND: `http://127.0.0.1:${ENUM.portas.PORTA_FRONTEND}`,
    };
  }

  static get tiposParamsTopGlobais() {
    return {
      MUSICAS: "musicas",
      ALBUNS: "albuns",
      ARTISTAS: "artistas"
    };
  }

}

export { ENUM };
