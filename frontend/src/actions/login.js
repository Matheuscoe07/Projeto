const SET_USUARIO_LOGADO = 'SET_USUARIO_LOGADO';
const SET_USUARIO_AUTH = 'SET_USUARIO_AUTH';
const LOGOUT_USUARIO = 'LOGOUT_USUARIO';

const setUsuarioLogado = (usuarioData) => {
  return {
    type: SET_USUARIO_LOGADO,
    dados: usuarioData,
  };
};

const setUsuarioAuth = () => {
  return {
    type: SET_USUARIO_AUTH,
  };
};

export { setUsuarioLogado, setUsuarioAuth, SET_USUARIO_LOGADO, SET_USUARIO_AUTH, LOGOUT_USUARIO };
