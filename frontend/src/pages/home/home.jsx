import React from 'react';
import CartaoPublicacao from '../../components/cartaoPublicacao/cartaoPublicacao';
import './home.css';

export default function Home({listaPublicacoes}) {
  return (
    <div className='ctn-page-home mx-auto py-2 my-4' style={{width:'55%'}}>
      <div className="text-center mt-2 my-4">
        <h1>Tweezer's</h1>
      </div>
      {listaPublicacoes.map((publicacao) => (
         <div key={publicacao.postID} className='item-cartao-publicacao' style={{border:' 1px solid rgba(255, 255, 255, 0.682)'}}>
            <CartaoPublicacao id={publicacao.postID} fotoUsuario={publicacao.fotoPerfil} nomeUsuario={publicacao.userID} timeStamp={publicacao.timeStamp} fotoMusica={publicacao.fotoMusica} nomeMusica={publicacao.nomeMusica} artista={publicacao.nomeArtista} comentario={publicacao.texto} curtidas={publicacao.curtidas} />
         </div>
      ))}
    </div>
  );
}

