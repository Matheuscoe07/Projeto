import React from 'react';
import CartaoArtista from '../cartaoArtistaGlobais/cartaoArtistaGlobais';

export default function ScrollArtista({listaArtista, porcentVH}) {
  return (
    <div className='scrollWrapper' style={{height: `${porcentVH}vh`, overflow: 'scroll'}}>
      {listaArtista.map((artista) => (
         <div key={artista.artistUri} className='itemArtista my-4'>
            <CartaoArtista fotoArtista={artista.artistImg} nomeArtista={artista.artistName} numeroSeguidores={artista.rank}/>
         </div>
      ))}
    </div>
  );
};