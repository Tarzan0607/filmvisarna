import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const Butik = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="butik">
      <img src='./images/Butik/popcorn.jpg' alt="Cover Photo" />
      <h1 className="title">Butik</h1>
      <p className="description"> <p>I lobbyn finner du vår butik som erbjuder godis, läsk och lättare snacks från flera populära aktörer</p>
      </p>
      <h2 className="title-small"></h2>
      <div className="carousel-container">
        <Slider {...settings}>
          <div className="carousel-item">
            <img src='./images/Butik/marabou.jpg' />
            <h3>Marabou - 200g</h3>
          </div>
          <div className="carousel-item">
            <img src='./images/Butik/chips.jpg' />
            <h3>OLW - liten</h3>
          </div>
          <div className="carousel-item">
            <img src='./images/Butik/coffe.jpg' />
            <h3>Kaffe</h3>
          </div>
          <div className="carousel-item">
            <img src='./images/Butik/combo.png' />
            <h3>Läsk + popcorn</h3>
          </div>
          <div className="carousel-item">
            <img src='./images/Butik/slash.jpg' />
            <h3>Snow Slush</h3>
          </div>
          <div className="carousel-item">
            <img src='./images/Butik/chips2.jpg' />
            <h3>Pringles</h3>
          </div>
        </Slider>
      </div>

    </div>
  );



};

export default Butik;
