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
         <div className={`row container-md mx-5 my-3 ${styles.login}`}>
               <div className='col-9'>
                  <div className='row'>
                     <div className='col-8' style={titulosPrincipais}>
                           <p>Logo</p>
                     </div>
                     <div className='col my-2' style={{ textAlign: 'right', marginRight: '1em'}}>
                           <a href={AUTH_URL}>Entre ou cadastra-se</a>
                     </div>
                  </div>
                  <div className='row my-5' style={titulosPrincipais}>
                     <p>Em Alta na Gringa</p>
                     {dataAlbuns.length === 0 ? <Spinner/> : <CarrosselAlbum listaAlbum={dataAlbuns}/>}
                  </div>
                  <div className='row my-5' style={titulosPrincipais}>
                     <p>Em alta no BR</p>
                     {/* 2{dataAlbuns.length === 0 ? <Spinner/> : <CarrosselAlbum listaAlbum={dataAlbuns}/>} */}
                  </div>
               </div>
               <div className='col-2 mx-auto text-center' style={titulosPrincipais}>
                  <p>Comunidades em Alta</p>
                     {Comunidades}
               </div>
         </div>
      </GlobalStyles>
   )

};


