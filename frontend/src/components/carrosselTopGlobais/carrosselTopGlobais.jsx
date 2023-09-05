import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CartaoTopGlobais from '../cartaoTopGlobais/cartaoTopGlobais';

export default function CarrosselTopGlobais({ listaObjetos, carroselConfig, listaBreakpoints }) {

   const getSettings = () => {

      listaBreakpoints.forEach(([breakpoint, slidesToShow]) => {
         carroselConfig.responsive.push({
            breakpoint,
            settings: {
               slidesToShow,
            },
         });
      });

      return carroselConfig;
   };

   const settings = getSettings();

   return (
         <Slider {...settings}>
            {listaObjetos.map((objeto) => (
               <div key={objeto.rank} className="slider-item-musica">
                  <CartaoTopGlobais foto={objeto.imagem} nome={`#${objeto.rank} ${objeto.nome}`} artista={objeto.artists[0].nome} />
               </div>
            ))}
         </Slider>
   );
}