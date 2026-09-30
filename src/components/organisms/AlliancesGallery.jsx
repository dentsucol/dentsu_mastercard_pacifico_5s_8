import React from 'react'
import { Link } from "react-router-dom"

import AlliedBox from '../molecules/AlliedBox'
import Icon from '../atoms/Icon';
import Slider from 'react-slick/lib/slider';

function AlliancesGallery({
  alliedBoxType,
  itemsPerLine,
  limit,
  termsOnModal,
  limitButtonText,
  list,
  termText,
  termLink
}) {

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return <button className="custom-next-arrow" onClick={onClick}><Icon name='nextArrow' /></button>;
  };
  
  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return <button className="custom-prev-arrow" onClick={onClick}><Icon name='prevArrow' /></button>;
  };

  const settings = {
    dots: false,
    // infinite: true,
    speed: 500,
    // centerMode:true,
    slidesToShow: 2,
    slidesToScroll: 1,
    // autoplay: true,
    arrows: false,
    centerPadding: '0px',
    initialSlide: 1, 
    pauseOnHover: true,
    focusOnSelect: true,
    nextArrow: <CustomNextArrow />, 
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {                    
          infinite: true,
          dots: true,          
          autoplay: true,    
          slidesToShow: 1,
          slidesToScroll: 1,          
          rows:1,
          centerMode: true,
          centerPadding: '50px 0px 0px 0px',
        },
      },
   
    ]
  }

  return (
    <div className={`mc-alliances-container mc-alliances-column-${itemsPerLine}`}>
      
      {list &&
        <div className="mc-alliances-container__items">
          <Slider {...settings}>
          {list.filter((item, i) => {

            return limit ? i < limit ? true : false : true
          }).map((item, index) => {

            return (
              <div key={index} className={`mc-alliances-container__items--item type-${alliedBoxType}`}>
                <AlliedBox
                  type={alliedBoxType}
                  allied={item}
                  termLink={termLink}
                  termText={termText}
                  termsOnModal={termsOnModal}
                  termsData={item.termsData}
                />
              </div>
            )
          })}
          </Slider>
        </div>
      }

      {limit && limitButtonText &&
        <div className="mc-alliances-container__actions">
          <Link to="/alianzas">{limitButtonText}</Link>
        </div>
      }

    </div>
  )
}

export default AlliancesGallery