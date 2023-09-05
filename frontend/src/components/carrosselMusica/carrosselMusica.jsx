import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CartaoAlbum from '../cartaoAlbum/cartaoAlbum';

export default function CarrosselMusica({ listaMusica, listaBreakpoints }) {

   const getSettings = () => {
      const defaultSettings = {
         infinite: true,
         speed: 1000,
         slidesToShow: 4,
         slidesToScroll: 4,
         responsive: [],
      };

      listaBreakpoints.forEach(([breakpoint, slidesToShow]) => {
         defaultSettings.responsive.push({
            breakpoint,
            settings: {
               slidesToShow,
            },
         });
      });

      return defaultSettings;
   };

   const settings = getSettings();

   return (
         <Slider {...settings}>
            {listaMusica.map((musica) => (
               <div key={musica.rank} className="slider-item-musica">
                  <CartaoAlbum fotoAlbum={musica.trackImg} nome={`#${musica.rank} ${musica.trackName}`} artista={musica.artists[0].name} />
               </div>
            ))}
         </Slider>
   );
}