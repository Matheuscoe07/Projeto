import React, { useEffect, useState } from 'react';
import './login.css'; // Importe o arquivo CSS aqui
import CarrosselAlbum from '../../components/carrosselAlbum/carrosselAlbum';
import Spinner from '../../components/spinner/spinner';
import ScrollArtista from '../../components/scrollArtist/scrollArtista';
import SpotifyDataProcessor from '../../services/dataProcessor';
import util from '../../Util/util';
import ENUM from '../../Util/enums';
import { setTokenReact } from '../../actions/login';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


export default function Login({ EmAlta, EmAltaBR, Comunidades, store }) {
   const AUTH_URL = `${ENUM.enderecosIP.SERVICO_API_SPOTIFY2}/api_spotify/login`;
   const dispatch = useDispatch();
   // SliderSettings breakpoints: window Size: 1024px, slidesToShow: 2
   const breakpointsAlbuns = [[1200, 3], [992, 2], [768, 1]];

   const [dataAlbuns, setDataAlbuns] = useState([]);
   const [dataArtistas, setDataArtistas] = useState([]);
   const [spinner, setSpinner] = useState(true);

   const gerenciarAuthClick = () => {
      try {
         let tokenReact = util.generateRandomString(16);
         dispatch(setTokenReact(tokenReact))
         console.log('CLIQUEI: ', store.getState());
         const AUTH_URL_WITH_TOKEN = `${AUTH_URL}/${tokenReact}`;
         window.location.href = AUTH_URL_WITH_TOKEN;
      } catch (error) {
         console.log('Erro de rede');
      }
   };

   useEffect(() => {

      const fetchData = () => {
         try {
            const dataProcessor = new SpotifyDataProcessor();
            const dataAlbuns = dataProcessor.getPopularAlbuns(); //vou precisar colocar await
            const dataArtistas = dataProcessor.getPopularArtistas(); //vou precisar colocar await
            setDataAlbuns(dataAlbuns);
            setDataArtistas(dataArtistas);
            setSpinner(false)
         } catch (error) {
            console.error('Erro ao processar dados do Spotify:', error);
         }
      };

      const timer = setTimeout(() => {
         fetchData()
      }, 0);

   });

   return (
      <div className='ctn-home'>

         <div className='row header-home'>
            <div className='col-6'>
               <p>Logo</p>
            </div>
            <div className='col-6 text-center'>
               <p className='click' onClick={gerenciarAuthClick}>
                  Entre ou cadastre-se
               </p>
            </div>
         </div>

         <div className='row body-home my-3'>
            <div className='col-9 carroseis'>
               <div className='carrosel-gringo main-titles'>
                  <p>Em Alta na Gringa</p>
                  {dataAlbuns.length === 0 ? <Spinner /> : <CarrosselAlbum listaAlbum={dataAlbuns} listaBreakpoints={breakpointsAlbuns} />}
               </div>
               <div className='carrosel-brasil main-titles  my-3'>
                  <p>Em alta no BR</p>
                  {dataAlbuns.length === 0 ? <Spinner /> : <CarrosselAlbum listaAlbum={dataAlbuns} listaBreakpoints={breakpointsAlbuns} />}
               </div>
            </div>
            <div className='col-3 scrolls p-0'>
               <div className='scroll-artistas text-center main-titles pt-2' style={{ marginLeft: '1.5em', backgroundColor: '#343434', width: '80%' }}>
                  <p>Artistas em Alta</p>
                  <ScrollArtista listaArtista={dataArtistas} />
               </div>
            </div>
         </div>

      </div>
   )
};


