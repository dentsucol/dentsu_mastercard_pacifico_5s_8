import React from 'react'
import Slider from "react-slick"

import CardBox from '../molecules/CardBox'
import useWidth from '../../hooks/useWidth'

// Flecha siguiente personalizada con icono
function NextArrow({ onClick }) {
  return (
    <button className="slick-arrow-custom slick-next-custom" onClick={onClick}>
      <img src="/assets/images/arrow_right_icon.svg" alt="Next" />
    </button>
  )
}

// Flecha anterior personalizada con icono
function PrevArrow({ onClick }) {
  return (
    <button className="slick-arrow-custom slick-prev-custom" onClick={onClick}>
      <img src="/assets/images/arrow_forward_icon.svg" alt="Previous" />
    </button>
  )
}

function SliderRotator({
  mobileItemsToShow,
  desktopItemsToShow,
  list,
  style,
  showArrows,
  ext,
  infinite,
  Benefits,
}) {
  const { width } = useWidth()

  const settings = {
    dots: true,
    infinite: infinite && list.length > desktopItemsToShow ? true : false, 
    speed: 500,
    slidesToShow: Math.min(desktopItemsToShow, list.length),
    slidesToScroll: Benefits ? width < 992 ? 1 : 3 : 1,
    autoplay: infinite ? true : false,
    arrows: showArrows,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerMode: false,
    centerPadding: '20px',
    variableWidth: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      }
    ]
  }

  return (
    <div className={`mc-slider-rotator`}>
      <Slider {...settings}>
        {list.filter((slide) => {

          if (width < 992) {
            if (slide.space) {
              return false
            } else {
              return true
            }
          } else {
            return true
          }
          
        }).map((slide, index) => {

          return (
            <div key={index} className={`mc-slider-rotator__slide ${slide.space ? 'free' : ''}`}
            >
              <CardBox
                id={slide.id}
                image={slide.image}
                title={slide.title}
                titleDesktop={slide.titleDesktop}
                desc={slide.desc}
                style={style}
                ext={ext}
              />
            </div>
          )
        })}
      </Slider>
    </div>
  )
}

export default SliderRotator