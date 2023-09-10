import { SET_USUARIO_LOGADO, SET_TOKEN_REACT, LOGOUT_USUARIO } from '../actions/login.js';

const estadoInicial = {
  usuario: null,
  autenticado: false,
  tokenReact: null,
  idEvento: null,
};

const loginReducer = (state = estadoInicial, acao) => {
  switch (acao.type) {
    case SET_USUARIO_LOGADO:
      const { tokens, ...userData } = acao.dados.usuario_logado;
      return {
        ...state,
        autenticado: true,
        usuario: userData,
        idEvento: acao.dados.idEvento,
        tokens: tokens,
      };
    case SET_TOKEN_REACT:
      return {
        ...state,
        tokenReact: acao.dados,
      };
      case LOGOUT_USUARIO:
        return {
          ...estadoInicial,
        };
    default:
      return state;
  }
};

export default loginReducer;