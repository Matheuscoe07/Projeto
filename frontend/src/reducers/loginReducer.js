import { SET_USUARIO_LOGADO, SET_USUARIO_AUTH, LOGOUT_USUARIO } from '../actions/login.js';

const estadoInicial = {
  autenticado: null,
  usuario: null,
};

const loginReducer = (state = estadoInicial, acao) => {
  switch (acao.type) {
    case SET_USUARIO_LOGADO:
      return {
        ...state,
        autenticado: true,
        usuario: acao.dados,
      };
    case SET_USUARIO_AUTH:
      return {
        ...state,
        autenticado: false,
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