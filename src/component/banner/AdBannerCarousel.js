// AdBannerCarousel.js

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './AdBannerCarousel.css'; // Importa o arquivo CSS para estilização

const images = [
  { src: 'baner1.png', link: 'https://www.link1.com' },
  { src: 'baner2.png', link: 'https://www.link2.com' },
]; // Adicione seus caminhos de imagem e links aqui

const AdBannerCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="ad-banner-carousel">
      <p className='text-adjustment' style={{marginBottom: '3px'}}>Publicidades</p>
      <Slider {...settings}>
        {images.map((item, index) => (
          <div key={index}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <img src={item.src} alt={`Imagem ${index + 1}`} />
              <div className="banner-overlay">
              </div>
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AdBannerCarousel;
