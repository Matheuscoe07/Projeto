import React, { useEffect, useState } from 'react';

import styles from './login.module.css'; // Importe o arquivo CSS aqui
import styled from 'styled-components';

import CarrosselAlbum from '../carrosselAlbum/carrosselAlbum';
import Spinner from '../spinner/spinner';
import SpotifyDataProcessor from '../../services/dataProcessor';


const GlobalStyles = styled.div`
  * {
    padding: 0;
    margin: 0;
  }
`;

export default function Login({ EmAlta, EmAltaBR, Comunidades}) {
   const AUTH_URL = 'http://localhost:8888/login'
   const titulosPrincipais = {fontSize: 30};

   const [dataAlbuns, setDataAlbuns] = useState([])
   const [spinner, setSpinner] = useState(true)

   useEffect(() => {
      const fetchData = () => {
         try {
            const dataProcessor = new SpotifyDataProcessor();
            const dataAlbuns = dataProcessor.getPopularAlbuns(); //vou precisar colocar await
            setDataAlbuns(dataAlbuns);
            setSpinner(false)
         } catch (error) {
            console.error('Erro ao processar dados do Spotify:', error);
         }
      };

      const timer = setTimeout(() => {
         fetchData()
      }, 0);

   },[]);

   return(
      <GlobalStyles>
         <div className={`container my-2 mx-5  ${styles.login}`}>
               <div className='row'>
                  <div className='col-lg-9 col-md-10 col-6'>
                     <div className='row'>
                        <div className='col-md-8 col-6' style={titulosPrincipais}>
                              <p>Logo</p>
                        </div>
                        <div className='col-md-4 col-6 my-2 text-center' style={{ textAlign: 'right'}}>
                              <a href={AUTH_URL}>Entre ou cadastra-se</a>
                        </div>
                     </div>
                     <div className='row my-3' style={titulosPrincipais}>
                        <p>Em Alta na Gringa</p>
                        {dataAlbuns.length === 0 ? <Spinner/> : <CarrosselAlbum listaAlbum={dataAlbuns}/>}
                     </div>
                     <div className='row my-3' style={titulosPrincipais}>
                        <p>Em alta no BR</p>
                        {dataAlbuns.length === 0 ? <Spinner/> : <CarrosselAlbum listaAlbum={dataAlbuns}/>}
                     </div>
                  </div>
                  <div className='col-xl-1 col-lg-0'></div>
                  <div className='col-lg-2 offset-lg-1 col-md-2 col-6 mx-auto text-center' style={titulosPrincipais}>
                     <p>Artistas em Alta</p>
                        {Comunidades}
                  </div>
               </div>
         </div>
      </GlobalStyles>
   )

};


