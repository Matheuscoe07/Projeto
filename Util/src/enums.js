class Enum {
  static get tiposEventos() {
    return {
      USUARIO_LOGADO: "usuario_logado",
    };
  }

  static get portas() {
    return {
      PORTA_USUARIO: 5001,
      PORTA_BARRAMENTO: 10000,
    };
  }

  static get enderecosIP() {
    return {
      SERVICO_USUARIO: `http://127.0.0.1:${Enum.portas.PORTA_USUARIO}`,
      SERVICO_BARRAMENTO: `http://127.0.0.1:${Enum.portas.PORTA_BARRAMENTO}`,
    };
  }
}

module.exports = Enum;

