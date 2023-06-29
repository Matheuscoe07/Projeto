import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CartaoAlbum from '../cartaoAlbum/cartaoAlbum';

export default function CarrosselAlbum({listaAlbum}) {

   const [numberToShow, setNumberToShow] = useState(0);

   useEffect(() => {

      const calculateShow = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 550) {
         setNumberToShow(1);
        } else if (screenWidth <= 990) {
         setNumberToShow(2);
        } else if (screenWidth <= 1200) {
         setNumberToShow(3);
        } else {
         setNumberToShow(4);
        }
      };

      calculateShow(); // Chama a função uma vez para definir o valor inicial com base no tamanho da tela atual.

      window.addEventListener('resize', calculateShow); // Adiciona um ouvinte de redimensionamento da janela.
  
      return () => {
        window.removeEventListener('resize', calculateShow); // Remove o ouvinte de redimensionamento da janela ao desmontar o componente.
      };
      
    }, []);

    const settings = {
      // dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: numberToShow,
      slidesToScroll: numberToShow,
  };

    return (
      <div className="sliderWrapper">
         <Slider {...settings}>
               {listaAlbum.map((album) => (
                  <div key={listaAlbum.id} className='albumItem'>
                     <CartaoAlbum fotoAlbum={`${album.imagem}`} nomeMusica={`${album.titulo}`} artista={`${album.artista}`}/>
                  </div>
               ))}
         </Slider>
      </div>
    );
};