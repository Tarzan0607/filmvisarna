import React from "react";
import Slider from "react-slick";




const Butik = () => {

   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3
    };
  return (
    <div className="butik">
      <img src= './images/Butik/popcorn.jpg' alt="Cover Photo" />
      <h1 className="title">Butik</h1>
      <p className="description"> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae minus consequuntur, aliquid sapiente alias possimus numquam, cupiditate earum vitae iure labore debitis incidunt quam? Iure quae quasi ea aperiam inventore.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae minus consequuntur, aliquid sapiente alias possimus numquam, cupiditate earum vitae iure labore debitis incidunt quam? Iure quae quasi ea aperiam inventore.</p>
      </p>
       <h1 className="title">Food & Drinks</h1>
     <div className="carousel-container">
      <Slider {...settings}>
        <div className="carousel-item">
          <img src='./images/Butik/marabou.jpg'  />
          <h3>Marabou</h3>
        </div>
        <div className="carousel-item">
          <img src='./images/Butik/chips.jpg'  />
          <h3>Olw</h3>
        </div>
        <div className="carousel-item">
         <img src='./images/Butik/coffe.jpg'  />
          <h3>Coffee</h3>
        </div>
        <div className="carousel-item">
          <img src='./images/Butik/combo.png'  />
          <h3>Pop-Combo</h3>
        </div>
        <div className="carousel-item">
          <img src='./images/Butik/slash.jpg'  />
          <h3>Slash</h3>
        </div>
        <div className="carousel-item">
          <img src='./images/Butik/chips2.jpg'  />
          <h3>Pringles</h3>
        </div>
      </Slider>
    </div>

    </div>
  );

  
  
};

export default Butik;
