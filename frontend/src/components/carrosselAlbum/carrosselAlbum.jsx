import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CartaoAlbum from '../cartaoAlbum/cartaoAlbum';

export default function CarrosselAlbum({ listaAlbum, listaBreakpoints }) {

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
            {listaAlbum.map((album) => (
               <div key={album.id} className="slider-item-album">
                  <CartaoAlbum fotoAlbum={album.imagem} nomeMusica={album.titulo} artista={album.artista} />
               </div>
            ))}
         </Slider>
   );
}