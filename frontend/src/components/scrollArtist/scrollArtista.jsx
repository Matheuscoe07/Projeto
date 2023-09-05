import React from 'react';
import CartaoArtista from '../cartaoArtista/cartaoArtista';

export default function ScrollArtista({listaArtista}) {
  return (
    <div className='scrollWrapper' style={{height: '85vh', overflow: 'scroll'}}>
      {listaArtista.map((artista) => (
         <div key={artista.artistUri} className='itemArtista px-2' style={{ width: '10em', height: '110px' }}>
            <CartaoArtista fotoArtista={artista.artistImg} nomeArtista={artista.artistName} numeroSeguidores={artista.rank}/>
         </div>
      ))}
    </div>
  );
};