import React from 'react';
import CartaoPublicacao from '../../components/cartaoPublicacao/cartaoPublicacao';
import './home.css';

export default function Home({listaPublicacoes}) {
  return (
    <div className='ctn-page-home w-50 mx-auto py-2 my-4'>
      <div className="text-center mt-2 my-4">
        <h1>Tweezer's</h1>
      </div>
      {listaPublicacoes.map((publicacao) => (
         <div key={publicacao.id} className='item-cartao-publicacao my-2'>
            <CartaoPublicacao fotoUsuario={publicacao.fotoUsuario} nomeUsuario={publicacao.nomeUsuario} timeStamp={publicacao.timeStamp} fotoMusica={publicacao.fotoMusica} nomeMusica={publicacao.nomeMusica} artista={publicacao.artista} comentario={publicacao.comentario} />
         </div>
      ))}
    </div>
  );
}

