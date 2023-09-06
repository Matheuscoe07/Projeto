import React, { useState } from 'react';
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

  // Estado para controlar o link ativo
  let activeLink = activeLinkGlobal;

  // Função para atualizar o link ativo
  const handleLinkClick = (linkId) => {
    activeLink = linkId;
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
      <div className='col click ctn-profile-navbar ms-3'>
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
      <div className='col ms-3'>
        <p className='click' onClick={chamarAutenticacaoSpotify}>
          Entre ou cadastre-se
        </p>
      </div>
    );
  }

  return (
    <nav className="ctn-navbar p-3">
      <div className='row align-items-center'>
        <div className='col-3 ctn-logo ms-4'>
          <img src={logo} alt="Logo" style={{ width: '170px' }} />
        </div>
        <div className='col-7 ctn-list'>
          <ul>
            <li className={`click list-inline-item ${activeLink === activeLinkGlobal ? 'link-ativo' : ''}`}>
              <NavLink to={`${urlBasica}/home`}>Global</NavLink>
            </li>
            <li className={`click list-inline-item ${activeLink === activeLinkHome ? 'link-ativo' : ''}`}>
              <NavLink to={`${urlBasica}/home`} onClick={() => handleLinkClick(activeLinkHome)}>Home</NavLink>
            </li>
            <li className={`click list-inline-item ${activeLink === activeLinkCriarPubli ? 'link-ativo' : ''}`}>
              <NavLink to={`${urlBasica}/criarpublicacao`} onClick={() => handleLinkClick(activeLinkCriarPubli)}>Publicar um Tweezer</NavLink>
            </li>
            <li className={`click list-inline-item ${activeLink === activeLinkCriarPerfil ? 'link-ativo' : ''}`}>
              <NavLink to={`${urlBasica}/perfil`} onClick={() => handleLinkClick(activeLinkCriarPerfil)}>Meus Dados</NavLink>
            </li>
          </ul>
        </div>
        {usuarioAutenticado ? componenteUsuarioLogado() : componenteUsuarioDeslogado()}
      </div>
    </nav>
  );
}