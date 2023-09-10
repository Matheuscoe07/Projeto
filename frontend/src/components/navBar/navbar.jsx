import React, { useEffect, useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import './navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../images/logo.png';
import { setTokenReact, setLogout } from '../../actions/login'
import ENUM from '../../Util/enums';
import util from '../../Util/util';

export default function Navbar({ usuarioAutenticado }) {
  const activeLinkGlobal = 'global', activeLinkHome = 'home', activeLinkCriarPubli = 'criarPublic', activeLinkCriarPerfil = 'perfil';
  const tokenReact = useSelector(state => state.loginReducer.tokenReact);
  const usuarioData = useSelector(state => state.loginReducer.usuario);
  const idEvento = useSelector(state => state.loginReducer.idEvento);
  const urlBasica = `/auth/${idEvento}/${tokenReact}`;
  const dispatch = useDispatch();
  const [activeLink, setActiveLink] = useState(activeLinkGlobal);


  // Função para atualizar o link ativo
  const handleLinkClickAuth = (linkId) => {
    if (!usuarioAutenticado) {
      alert('Você precisa fazer login!');
    } else {
      setActiveLink(linkId);
    }
  };

  const handleLinkClick = (linkId) => {
    setActiveLink(linkId);
  };

  const fazerLogout = () => {
    dispatch(setLogout());
    handleLinkClick(activeLinkGlobal);
  }

  const chamarAutenticacaoSpotify = () => {
    try {
      let tokenReact = util.generateRandomString(16);
      dispatch(setTokenReact(tokenReact))
      const AUTH_URL_WITH_TOKEN = `${ENUM.enderecosIP.SERVICO_API_SPOTIFY2}/api_spotify/login/${tokenReact}`;
      window.location.href = AUTH_URL_WITH_TOKEN;
    } catch (error) {
      console.log('Erro de rede');
    }
  };

  const componenteUsuarioLogado = () => {
    return (
        <div className='ctn-profile-navbar click'>
          <img className="profile-pic" src={usuarioData._fotoPerfil} alt="Foto de Perfil" />
          <p className='d-inline'>Olá, {usuarioData._nome.split(" ")[0]}</p>
          <div className="ctn-user-options">
            <ul>
              <li >
              <NavLink to={`/login`} className='click' onClick={fazerLogout}>Sair</NavLink>
              </li>
            </ul>
            <div className="seta-para-baixo"></div>
          </div>
        </div>
    );
  }

  const componenteUsuarioDeslogado = () => {
    return (
        <div className="ctn-usuario-deslogado">
          <p className='click' onClick={chamarAutenticacaoSpotify}>
            Entre ou cadastre-se
          </p>
        </div>
    );
  }
  useEffect(() => {}, [activeLink]);

  return (
    <nav className="ctn-navbar p-3 sticky-top">
      <div className='row align-items-center px-4'>
        <div className='col-2 ctn-logo '>
          <img src={logo} alt="Logo" style={{ width: '170px' }} />
        </div>
        <div className='col-7'>
          <ul className='ctn-list'>
            <li className={`list-inline-item ${activeLink === activeLinkGlobal ? 'link-ativo' : ''}`}>
              <NavLink to={ usuarioAutenticado ? `${urlBasica}/top-globais` : null} onClick={() =>  handleLinkClick(activeLinkGlobal)} >Global</NavLink>
            </li>
            <li className={`list-inline-item ${activeLink === activeLinkHome ? 'link-ativo' : ''}`}>
              <NavLink to={ usuarioAutenticado ? `${urlBasica}/home` : null}  onClick={() => handleLinkClickAuth(activeLinkHome)}>{usuarioAutenticado ? 'Home' : ''}</NavLink>
            </li>
            <li className={`list-inline-item ${activeLink === activeLinkCriarPubli ? 'link-ativo' : ''}`}>
              <NavLink to={usuarioAutenticado ? `${urlBasica}/criar-post` : null} onClick={() => handleLinkClickAuth(activeLinkCriarPubli)}> {usuarioAutenticado ? 'Publicar um Tweezer' : ''}</NavLink>
            </li>
            <li className={`list-inline-item ${activeLink === activeLinkCriarPerfil ? 'link-ativo' : ''}`}>
              <NavLink className='p-0 m-0' to={ usuarioAutenticado ? `${urlBasica}/perfil` : null} onClick={() => handleLinkClickAuth(activeLinkCriarPerfil)}>{usuarioAutenticado ? 'Meus Dados' : ''}</NavLink>
            </li>
          </ul>
        </div>
        <div className='col ms-5'>
        {usuarioAutenticado ? componenteUsuarioLogado() : componenteUsuarioDeslogado()}
        </div>
      </div>
    </nav>
  );
}
