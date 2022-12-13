import React from "react";
import d from "../../assets/image-custom/4.png";
import e from "../../assets/image-custom/5.png";
import { useContext } from "react";
import { DetailContext } from "../DetailPage";

import "../../assets/sass/detailpage/DetaiCarousel.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function DetaiCarousel() {
  const context = useContext(DetailContext);
  
  const settings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    arrows: false,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    focusOnSelect: true,
    speed: 500,
  };
  return (
    <div className="container-fluid container-carousel">
      <Slider {...settings}>
        {context.data.image.map((image, index) => {
          return (
            <div key={index}>
            <img src={image} alt="" />
            </div>
          )
        })}
      </Slider>
    </div>
    /* End container */
  );
}

export default DetaiCarousel;
