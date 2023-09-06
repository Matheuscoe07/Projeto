export const SET_USUARIO_LOGADO = 'SET_USUARIO_LOGADO';
export const SET_TOKEN_REACT = 'SET_TOKEN_REACT';
export const LOGOUT_USUARIO = 'LOGOUT_USUARIO';

export const setUsuarioLogado = (usuarioData) => {
  return {
    type: SET_USUARIO_LOGADO,
    dados: usuarioData,
  };
};

export const setTokenReact = (tokenReact) => {
  return {
    type: SET_TOKEN_REACT,
    dados: tokenReact,
  };
};

export const setLogout = () => {
  return {
    type: LOGOUT_USUARIO,
  };
};


