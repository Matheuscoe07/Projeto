import React from 'react';
import './cartaoAlbum.css'

export default function CartaoAlbum({ fotoAlbum, nome, artista, ouvinte }) {
   return (
      <div className='ctn-cartao-album mx-auto'>
         <div className='item-imagem'>
            <img src={fotoAlbum} />
         </div>
         <div className='item-info'>
            <p className='nome text-truncate click' style={{ fontSize: '.7em' }}>{nome}</p>
            <p className='artista click' style={{ fontSize: '.55em' }}>{artista}</p>
            {ouvinte && <p className='click'>{`Ouvido por ${ouvinte}`}</p>}
         </div>
      </div>
   );
}