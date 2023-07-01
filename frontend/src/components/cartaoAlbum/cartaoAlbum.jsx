import React from 'react';
import './cartaoAlbum.css'

export default function CartaoAlbum({fotoAlbum, nomeMusica, artista, ouvinte}){
    return (
        <div className="ctn">
            <img src={fotoAlbum}/>
            <p className='musica text-truncate'>{nomeMusica}</p>
            <p className='artista'>{artista}</p>
            {ouvinte && <p>{`Ouvido por ${ouvinte}`}</p>}
        </div>
  );
}