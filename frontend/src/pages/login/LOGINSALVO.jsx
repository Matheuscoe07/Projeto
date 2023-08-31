import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css'; // Importe o arquivo CSS aqui

import CarrosselAlbum from '../carrosselAlbum/carrosselAlbum';
import Spinner from '../spinner/spinner';
import ScrollArtista from '../scrollArtist/scrollArtista';
import SpotifyDataProcessor from '../../services/dataProcessor';


export default function Login({ EmAlta, EmAltaBR, Comunidades, autenticado }) {
   const AUTH_URL = 'http://localhost:8888/api_spotify/login'

   // SliderSettings breakpoints: window Size: 1024px, slidesToShow: 2
   const breakpointsAlbuns = [[1200, 3], [992, 2], [768, 1]];

   const [dataAlbuns, setDataAlbuns] = useState([])
   const [dataArtistas, setDataArtistas] = useState([])
   const [spinner, setSpinner] = useState(true)


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

   }, []);

   const handleAuthClick = async () => {
      try {
        const response = await axios.get('URL_DA_SUA_API_DE_AUTENTICACAO');
        
        if (response.data.success) {
          setAuthStatus('Autenticado com sucesso!');
        } else {
          setAuthStatus('Erro de autenticação.');
        }
      } catch (error) {
        setAuthStatus('Erro de rede');
      }
    };
    
   return (
      <div className='ctn-home'>

         <div className='row header-home'>
            <div className='col-6'>
               <p>Logo</p>
            </div>
            <div className='col-6 text-center'>
               {autenticado ? (
                  <Link to='/perfil'>
                     <p className="underline-on-hover">Foto Usuário</p>
                  </Link>
               ) : (
                  <p className='click' onClick={() => window.location.href = AUTH_URL}>
                     Entre ou cadastre-se
                  </p>
               )}
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




