import React, { useEffect, useState } from 'react';
import './login.css'; // Importe o arquivo CSS aqui
import CarrosselAlbum from '../../components/carrosselAlbum/carrosselAlbum';
import CarrosselMusica from '../../components/carrosselMusica/carrosselMusica';
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
   const breakpoints = [[1200, 3], [992, 2], [768, 1]];

   const [dataTopMusicas, setDataTopMusicas] = useState([]);
   const [dataTopAlbuns, setDataTopAlbuns] = useState([]);
   const [dataTopArtistas, setDataTopArtistas] = useState([]);
   const [spinner, setSpinner] = useState(true);

   const gerenciarAuthClick = () => {
      try {
         let tokenReact = util.generateRandomString(16);
         dispatch(setTokenReact(tokenReact))
         const AUTH_URL_WITH_TOKEN = `${AUTH_URL}/${tokenReact}`;
         window.location.href = AUTH_URL_WITH_TOKEN;
      } catch (error) {
         console.log('Erro de rede');
      }
   };

   useEffect(() => {
      const fetchData = async () => {
        try {
          const promises = [
            util.sendRequestGET(`${ENUM.enderecosIP.SERVICO_API_SPOTIFY}/api_spotify/top-globais/musicas`, undefined, undefined, false),
            util.sendRequestGET(`${ENUM.enderecosIP.SERVICO_API_SPOTIFY}/api_spotify/top-globais/albuns`, undefined, undefined, false),
            util.sendRequestGET(`${ENUM.enderecosIP.SERVICO_API_SPOTIFY}/api_spotify/top-globais/artistas`, undefined, undefined, false)
          ];
          const [returnDataTopMusicas, returnDataTopAlbuns, returnDataTopArtistas] = await Promise.all(promises);
    
          // Agora você pode tratar a saída das chamadas antes de atribuí-las a variáveis
          if (returnDataTopMusicas.status && returnDataTopAlbuns.status && returnDataTopArtistas.status) {
            setDataTopAlbuns(returnDataTopAlbuns.data.slice(0, 15));
            setDataTopMusicas(returnDataTopMusicas.data.slice(0, 15));
            setDataTopArtistas(returnDataTopArtistas.data.slice(0, 15));
          }
    
          setSpinner(false);
        } catch (error) {
          console.error('Erro ao processar dados do Spotify:', error);
        }
      };
    
      fetchData();
    }, []);
    
    useEffect(() => {
      console.log('Dados de músicas:', dataTopMusicas);
      console.log('Dados de álbuns:', dataTopAlbuns);
      console.log('Dados de artistas:', dataTopArtistas);
    }, [dataTopMusicas, dataTopAlbuns, dataTopArtistas]);
    

   return (
      <div className='ctn-home'>

         <div className='row header-home'>
            <div className='col-6'>
               <h1 style={{color:'white'}}>Logo</h1>
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
                  <p>Top 15 Músicas em Altas </p>
                  {dataTopMusicas.length === 0 ? <Spinner /> : <CarrosselMusica listaMusica={dataTopMusicas} listaBreakpoints={breakpoints} />}
               </div>
               <div className='carrosel-brasil main-titles  my-3'>
                  <p>Top 15 Playlists mais Ouvidas</p>
                  {dataTopAlbuns.length === 0 ? <Spinner /> : <CarrosselAlbum listaAlbum={dataTopAlbuns} listaBreakpoints={breakpoints} />}
               </div>
            </div>
            <div className='col-3 scrolls p-0'>
               <div className='scroll-artistas text-center main-titles pt-2' style={{ marginLeft: '1.5em', backgroundColor: '#343434', width: '80%' }}>
                  <p className='mb-4'>Artistas em Alta</p>
                  <ScrollArtista listaArtista={dataTopArtistas} />
               </div>
            </div>
         </div>

      </div>
   )
};



