import React, { useContext, useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom"
import Slider from "react-slick"

import { StateController } from './../../App'
import AwardBox from '../molecules/AwardBox'
import { itsFiltered }  from '../../utils/functions'

function AwardsGallery({
  awardBoxType,
  itemsPerLine,
  limit,
  limitButtonText,
  list,
  canRedem,
  termText,
  termLink,
  termModal,
  redemtionText,
  steps,
  showStock,
  download,
  twoStepAuth,
  setAward_exhausted
}) {
  const {context} = useContext(StateController)
  const [opts, setOpts] = useState([])
  const [currentGallery, setCurrentGallery] = useState(false)
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef();

  const chunkArray = (arr, size) =>
    arr.reduce((acc, _, i) => (i % size === 0 ? [...acc, arr.slice(i, i + size)] : acc), []);


  useEffect(() => {
    if (context && context.awards) {
      setOpts(
        Object.keys(context.awards).map((key) => context.awards[key])
      )
    }
    console.log('context',context);
  }, [context.awards])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {

    if(list.length === 0){
      if (setAward_exhausted) {
        setAward_exhausted(true)
      }
    }
  }, [list])

  const stepper_settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    customPaging: function(i) {
      return (
        <span key={i}>
          <p>{`Mes ${i+1}`}</p>
        </span>
      )
    }
  }

  const groupedItems = isMobile
    ? chunkArray(list, 3) // mobile: 8 por slide
    : chunkArray(list, 3); // desktop: 9 por slide (3 filas de 3)

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  const galleryToggler = (e) => {
    setCurrentGallery(e.target.value)
  }

  return (
    <div className={`mc-awards-container mc-awards-column-${itemsPerLine}`}>

      {context && context.allAwards && context.allAwards[0] && 
        <div className="mc-awards-container__selector">
          <select name="gallery-selector" id="gallery-selector" value={currentGallery} onChange={galleryToggler}>
            <option value="">Filtrar por valor</option>
            {itsFiltered(20000, context.availableForRedemtion) && <option value="20000">$20.000</option>}

          </select>
        </div>
      }
        
      {steps
        ? <div className="mc-awards-container__steper">
            <Slider {...stepper_settings}>
              {opts.map((step, index) => {

                return (
                  <div className="mc-awards-container__items" key={index}>
                    {step.awards.map((item, index) => {
                      
                      return (
                        <div key={index} className={`mc-awards-container__items--item type-${awardBoxType}`}>
                          <AwardBox
                            type={awardBoxType}
                            award={item}
                            canRedem={step.canRedem ? step.canRedem : false}
                            termLink={termLink}
                            termText={termText}
                            termModal={termModal}
                            redemtionText={redemtionText}
                          />
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </Slider>
          </div>
        : list && list[0] 
        ? <div className="mc-awards-container__items">
            <Slider ref={sliderRef} {...settings}>
                {groupedItems.map((group, slideIndex) => (
                  <div key={slideIndex}>
                    <div
                      className={`slide-group ${isMobile ? "vertical-group" : "grid-group"}`}
                    >
                      {group.map((item, index) => {
                        console.log("item award", item)
                        let inventory = false
                        if (download && item.prepurchased === 1) item.prepurchased = true
                        if (download && item.prepurchased === 0) item.prepurchased = false
                        const contextQuantity = context?.prepurchasedAwards?.find((preItem) => preItem.id_award == item.id)
                        console.log("contextQuantity", contextQuantity)
                        if (contextQuantity && contextQuantity.total) inventory = contextQuantity.total
                        console.log("item award", item.id, inventory)
                        return (
                          <div
                            key={index}
                            className={`mc-awards-container__items--item type-${awardBoxType}`}
                          >
                            <AwardBox
                              index={index}
                              type={awardBoxType}
                              award={item}
                              canRedem={canRedem}
                              termLink={termLink}
                              termText={termText}
                              termModal={termModal}
                              redemtionText={redemtionText}
                              showStock={showStock}
                              download={download}
                              twoStepAuth={twoStepAuth}
                              inventory={inventory}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </Slider>
              {groupedItems.length > 1 &&
                <div className="slider-footer">
                  <button
                    className="custom-arrow left"
                    onClick={() => sliderRef.current?.slickPrev()}
                  >
                  </button>

                  {/* Dots personalizados */}
                  {Array.from({ length: groupedItems.length }).map((_, idx) => (
                    <button
                      key={idx}
                      className={`dot ${currentSlide === idx ? "active" : ""}`}
                      onClick={() => sliderRef.current?.slickGoTo(idx)}
                    >
                      {idx + 1}
                    </button>
                  ))}

                  <button
                    className="custom-arrow"
                    onClick={() => sliderRef.current?.slickNext()}
                  >
                  </button>
                </div>
              }
            {/* {list.map((item, index) => {

              let inventory = false
              if (download && item.prepurchased === 1) item.prepurchased = true
              if (download && item.prepurchased === 0) item.prepurchased = false
              const contextQuantity = context?.prepurchasedAwards?.find((preItem) => preItem.id_award == item.id)

              if (contextQuantity && contextQuantity.total) inventory = contextQuantity.total
              console.log("item award", item.id, inventory)
       
              return (
                <div key={index} className={`mc-awards-container__items--item type-${awardBoxType} ${download && 'download'}`}>
                  <AwardBox
                    index={index}
                    type={awardBoxType}
                    award={item}
                    canRedem={canRedem}
                    termLink={termLink}
                    termText={termText}
                    termModal={termModal}
                    redemtionText={redemtionText}
                    showStock={showStock}
                    download={download}
                    twoStepAuth={twoStepAuth}
                    inventory={inventory}
                  />
                </div>
              )
            })} */}
          </div>
        : <div className="emptylogo">
            <img src='/assets/images/emptyAwards.png' />
          </div>
      }

      {limit && limitButtonText && (list && list[0]) && 
        <div className="mc-awards-container__actions">
          <Link to="/premios">{limitButtonText}</Link>
        </div>
      }
    </div>
  )
}

export default AwardsGallery