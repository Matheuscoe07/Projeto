import React, { useEffect, useState } from 'react';
import './topGlobais.css'; // Importe o arquivo CSS aqui
import CarrosselTopGlobais from '../carrosselTopGlobais/carrosselTopGlobais';
import Spinner from '../spinner/spinner';
import ScrollArtista from '../scrollArtistaGlobais/scrollArtistaGlobais';
import util from '../../Util/util';
import ENUM from '../../Util/enums';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


export default function TopGlobais() {
   const breakpoints = [[1200, 3], [992, 2], [768, 1]];

   const carroselConfig = {
      infinite: true,
      speed: 1000,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [],
   };

   const [dataTopMusicas, setDataTopMusicas] = useState([]);
   const [dataTopAlbuns, setDataTopAlbuns] = useState([]);
   const [dataTopArtistas, setDataTopArtistas] = useState([]);
   const [spinner, setSpinner] = useState(true);



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
    
   return (
      <div className='ctn-home'>
         
         {/* <div className='row header-home bg-primary'>
            <div className='col-6'>
               <img src={logo} alt="Logo" style={{width:'150px'}} />
            </div>
            <div className='col-6 text-center'>
               <p className='click' onClick={chamarAutenticacaoSpotify}>
                  Entre ou cadastre-se
               </p>
            </div>
         </div> */}

         <div className='row body-home my-3'>
            <div className='col-9 carroseis'>
               <div className='carrosel-musicas '>
                  <h1 className='main-titles'> Top 15 Músicas em Altas </h1>
                  {dataTopMusicas.length === 0 ? <Spinner /> : <CarrosselTopGlobais listaObjetos={dataTopMusicas} carroselConfig={carroselConfig} listaBreakpoints={breakpoints} />}
               </div>
               <div className='carrosel-albuns my-3'>
                  <p className='main-titles'>Top 15 Playlists mais Ouvidas</p>
                  {dataTopAlbuns.length === 0 ? <Spinner /> : <CarrosselTopGlobais listaObjetos={dataTopAlbuns} carroselConfig={carroselConfig} listaBreakpoints={breakpoints} />}
               </div>
            </div>
            <div className='col-3 scrolls'>
               <div className='scroll-artistas text-center main-titles pt-2' style={{backgroundColor: '#343434' }}>
                  <p className='mb-4'>Artistas em Alta</p>
                  <ScrollArtista listaArtista={dataTopArtistas} />
               </div>
            </div>
         </div>

      </div>
   )
};



