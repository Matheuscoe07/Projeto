import React from 'react';
import CartaoArtista from '../cartaoArtista/cartaoArtista';

export default function ScrollArtista({listaArtista}) {
  return (
    <div className='scrollWrapper mx-auto p-2' style={{height: '85vh', overflow: 'scroll'}}>
      {listaArtista.map((artista) => (
         <div key={artista.id} className='itemArtista'>
            <CartaoArtista fotoArtista={artista.imagem} nomeArtista={artista.nome} numeroSeguidores={artista.seguidores}/>
         </div>
      ))}
    </div>
  );
};