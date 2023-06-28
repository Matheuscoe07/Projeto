import React from 'react';
import styles from './cartaoAlbum.module.css';
import styled from 'styled-components';

const GlobalStyles = styled.div`
  * {
    padding: 0;
    margin: 0;
  }
`;

export default function CartaoAlbum({fotoAlbum, nomeMusica, artista, ouvinte}){
    return (
    <GlobalStyles>
        <div className={`${styles.ctnMusica}`}>
            <div className={`${styles.albumWrapper}`}>
                <img src={fotoAlbum}/>
            </div>
            <p className={`${styles.musica} text-truncate`}>{nomeMusica}</p>
            <p className={`${styles.artista}`}>{artista}</p>
            {ouvinte && <p>{`Ouvido por ${ouvinte}`}</p>}
        </div>
    </GlobalStyles>
  );
}