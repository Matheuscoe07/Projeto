import React, { useEffect, useState } from 'react';
import './topGlobais.css'; // Importe o arquivo CSS aqui
import CarrosselTopGlobais from '../../components/carrosselTopGlobais/carrosselTopGlobais';
import Spinner from '../../components/spinner/spinner';
import ScrollArtista from '../../components/scrollArtistaGlobais/scrollArtistaGlobais';
import util from '../../Util/util';
import ENUM from '../../Util/enums';
// import { Navigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';

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
      <div className='container-xl ctn-home my-4 p-0'>
         
         <div className='row body-home'>

            <div className='col-9 carroseis py-2'>
               <div className='ctn-carrosel-musicas-helper'>
                  <div className='carrosel-musicas mx-auto pb-2' style={{width:'93%'}}>
                     <h1 className='main-titles ms-2 mt-2 mb-3'># Top 15 mais Ouvidas no Spotify</h1>
                     {dataTopMusicas.length === 0 ? <Spinner /> : <CarrosselTopGlobais listaObjetos={dataTopMusicas} carroselConfig={carroselConfig} listaBreakpoints={breakpoints} />}
                  </div>
               </div>
               <div className='ctn-carrosel-albuns-helper'>
                  <div className='carrosel-albuns mx-auto py-2'  style={{width:'93%'}}>
                     <h1 className='main-titles ms-2 mt-2 mb-3'># Top 15 Álbuns em Alta no Spotify</h1>
                     {dataTopAlbuns.length === 0 ? <Spinner /> : <CarrosselTopGlobais listaObjetos={dataTopAlbuns} carroselConfig={carroselConfig} listaBreakpoints={breakpoints} />}
                  </div>
               </div>
            </div>

            <div className='col-3 scroll py-2'>
               <div className='scroll-artistas mx-auto' style={{width:'95%'}}>
                  <h1 className='main-titles mt-2 mb-3 text-center'>Artistas em Alta</h1>
                  {dataTopArtistas.length === 0 ? <Spinner /> : <ScrollArtista listaArtista={dataTopArtistas} porcentVH={'90'}/>}
               </div>
            </div>
         </div>

      </div>
   )
};



