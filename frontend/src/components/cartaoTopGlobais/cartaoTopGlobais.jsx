import React from 'react';
import './cartaoTopGlobais.css'

export default function CartaoTopGlobais({ foto, nome, artista }) {
   return (
      <div className='ctn-cartao-album mx-auto'>
         <div className='item-imagem'>
            <img src={foto} />
         </div>
         <div className='item-info'>
            <p className='nome text-truncate click' style={{ fontSize: '.7em' }}>{nome}</p>
            <p className='artista click' style={{ fontSize: '.55em' }}>{artista}</p>
         </div>
      </div>
   );
}