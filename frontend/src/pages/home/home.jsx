import React from 'react';
import CartaoPublicacao from '../../components/cartaoPublicacao/cartaoPublicacao';
import './home.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom"
export default function Home({ listaPublicacoes, reTweezer }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navega para trás
  };

  function BackButton() {
    return (
      <div className="back-retweezer" onClick={handleBack}>
        <span>&larr;</span>
      </div>
    );
  }

  return (
    <div className='ctn-page-home mx-auto py-2 my-4' style={{ width: '55%' }}>
      <div className="ctn-page-home-header text-center mt-2 my-4">
        {reTweezer ?  <div>
    <BackButton />
    <h1>Re-Tweezer's</h1>
  </div>:  <h1>Tweezer's</h1>}
      </div>
      {listaPublicacoes.map((publicacao) => (
        <div key={publicacao.postID} className='item-cartao-publicacao' style={{ border: ' 1px solid rgba(255, 255, 255, 0.682)' }}>
          <CartaoPublicacao id={publicacao.postID} fotoUsuario={publicacao.fotoPerfil} nomeUsuario={publicacao.userID} timeStamp={publicacao.timeStamp} fotoMusica={publicacao.fotoMusica} nomeMusica={publicacao.nomeMusica} artista={publicacao.nomeArtista} comentario={publicacao.texto} curtidas={publicacao.curtidas} reTweezers={publicacao.postsFilhos} musicaID={publicacao.musicaID} />
        </div>
      ))}
    </div>
  );
}
