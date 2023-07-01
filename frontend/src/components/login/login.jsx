import React, { useEffect, useState } from 'react';

import './login.css'; // Importe o arquivo CSS aqui

import CarrosselAlbum from '../carrosselAlbum/carrosselAlbum';
import Spinner from '../spinner/spinner';
import ScrollArtist from '../scrollArtist/scrollArtist';
import SpotifyDataProcessor from '../../services/dataProcessor';


export default function Login({ EmAlta, EmAltaBR, Comunidades}) {
   const AUTH_URL = 'http://localhost:8888/login'
   const titulosPrincipais = {};

   // SliderSettings breakpoints: window Size: 1024px, slidesToShow: 2
   const breakpointsAlbuns = [[1200, 3], [992, 2], [768, 1] ];

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
         <div className={`container-lg login`}>
               <div className='row'>
                  <div className='col-md-10 col-6'>
                     <div className='row'>
                        <div className='col-md-8 col-6' style={titulosPrincipais}>
                              <p>Logo</p>
                        </div>
                        <div className='col-md-4 col-6 my-2 text-center' style={{ textAlign: 'right'}}>
                              <a href={AUTH_URL}>Entre ou cadastra-se</a>
                        </div>
                     </div>
                     <div className='row my-3 mainHedaers'>
                        <p>Em Alta na Gringa</p>
                        {dataAlbuns.length === 0 ? <Spinner/> : <CarrosselAlbum listaAlbum={dataAlbuns} listaBreakpoints={breakpointsAlbuns}/>}
                     </div>
                     <div className='row my-3 mainHedaers'>
                        <p>Em alta no BR</p>
                        {dataAlbuns.length === 0 ? <Spinner/> : <CarrosselAlbum listaAlbum={dataAlbuns} listaBreakpoints={breakpointsAlbuns}/>}
                     </div>
                  </div>
                  <div className='col-md-2 col-6 mx-auto text-center mainHedaers'>
                     <p>Artistas em Alta</p>
                     <ScrollArtist/>
                  </div>
               </div>
         </div>
   )
};


