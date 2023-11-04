class ENUM {
  static Map<String, String> get tiposEventos => {
        'USUARIO_LOGADO': 'usuario_logado',
        'POST_CRIADO': 'post_criado',
      };

  static Map<String, int> get portas => {
        'PORTA_USUARIO': 5001,
        'PORTA_POSTS': 5002,
        'PORTA_BARRAMENTO': 10000,
        'PORTA_API_SPOTIFY': 8888,
        'PORTA_FRONTEND': 5007,
      };

  static Map<String, String> get enderecosIP => {
        'SERVICO_USUARIO': 'http://127.0.0.1:${portas['PORTA_USUARIO']}',
        'SERVICO_POSTS': 'http://127.0.0.1:${portas['PORTA_POSTS']}',
        'SERVICO_BARRAMENTO': 'http://127.0.0.1:${portas['PORTA_BARRAMENTO']}',
        'SERVICO_API_SPOTIFY': 'http://127.0.0.1:${portas['PORTA_API_SPOTIFY']}',
        'SERVICO_API_SPOTIFY2': 'http://localhost:${portas['PORTA_API_SPOTIFY']}',
        'SERVICO_FRONTEND': 'http://127.0.0.1:${portas['PORTA_FRONTEND']}',
      };

  static Map<String, String> get tiposParamsTopGlobais => {
        'MUSICAS': 'musicas',
        'ALBUNS': 'albuns',
        'ARTISTAS': 'artistas',
      };
}

