import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CartaoAlbum from '../cartaoAlbum/cartaoAlbum';

const settings = {
    // dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
};

export default function CarrosselAlbum({listaAlbum}) {
    return (
        <div className="sliderWrapper">
            <Slider {...settings}>
                {listaAlbum.map((album) => (
                    <div key={listaAlbum.id}>
                        <CartaoAlbum fotoAlbum={`${album.imagem}`} nomeMusica={`${album.titulo}`} artista={`${album.artista}`}/>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

// ------------------------------------------------------------------------------------


// export default function CarrosselAlbum() {
//   const itemsPerSlide = 4;

//   const renderSlides = () => {
//     const slides = [];
//     let slideIndex = 0;

//     while (slideIndex < albums.length) {
//       const slideItems = albums.slice(slideIndex, slideIndex + itemsPerSlide);
//       const slide = (
//         <Carousel.Item key={slideIndex}>
//           <div className="row">
//             {slideItems.map((album) => (
//               <div className="col-lg-3" key={album.id}>
//                 <CartaoAlbum fotoAlbum={album.image} nomeMusica={album.title} artista={album.artista} />
//               </div>
//             ))}
//           </div>
//         </Carousel.Item>
//       );
//       slides.push(slide);
//       slideIndex += itemsPerSlide;
//     }

//     return slides;
//   };

//   return <Carousel>{renderSlides()}</Carousel>;
// }

  
  
  
    