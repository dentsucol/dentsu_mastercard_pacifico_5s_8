import React, { useEffect, useRef, useState } from 'react'
import Container from '../../layouts/Container/Container';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';
import { sendDataLayer } from '../../utils/functions';
import useWidth from '../../hooks/useWidth'
import { useNavigate } from 'react-router-dom'

const SectionCards = ({ items, subtitle2, showGoalCounter, context, tabIndex }) => {
  const [counter, setCounter] = useState(0)
  const [currentPosition, setCurrentPosition] = useState(1);
  const contentScrollRef = useRef(null)
  const SectionCardsRef = useRef(null)
  const rule = 'nocomplete'
  const { width } = useWidth()
  const navigate = useNavigate()

  const visibleItems = (items || []).filter(itm => (
    tabIndex && itm.location ? itm.location === tabIndex : true
  ))

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
          
        } else {
          entry.target.classList.remove("visible")
        }
      });
    }, { threshold: 0.04 });

    const cards = document.querySelectorAll(".card")
    cards.forEach((card) => observer.observe(card))

    const SectionCards = document.querySelectorAll(".SectionCards")
    SectionCards.forEach((item) => observer.observe(item))
  }, []);

  useEffect(() => {
    if (context && context.tracing) 
      setCounter(context.tracing.goal_count ? context.tracing.goal_count : 0)
  }, [context]);

  const scrollUp = () => {
    if (contentScrollRef.current) {
      const scrollContent = contentScrollRef.current;
      const firstCard = scrollContent.firstElementChild;

      if (!firstCard) return;

      const cardHeight = firstCard.offsetHeight;
      const newPosition = Math.max(currentPosition - 1, 1);

      scrollContent.scrollBy({
        top: -cardHeight,
        behavior: "smooth",
      });

      setCurrentPosition(newPosition);

      sendDataLayer({
        datalayer: {
          event: "carousel_navigation",
          text: "¿Qué incluye?",
          position: newPosition,
          site_url: "/premio-mayor",
        },
        repeat: true,
      });
    }
  };

  const scrollDown = () => {
    if (contentScrollRef.current) {
      const scrollContent = contentScrollRef.current;
      const firstCard = scrollContent.lastElementChild;

      if (!firstCard) return;

      const cardHeight = firstCard.offsetHeight;
      const newPosition = Math.min(currentPosition + 1, 3);

      scrollContent.scrollBy({
        top: cardHeight,
        behavior: "smooth",
      });

      setCurrentPosition(newPosition);

      sendDataLayer({
        datalayer: {
          event: "carousel_navigation",
          text: "¿Qué incluye?",
          position: newPosition,
          site_url: "/premio-mayor",
        },
        repeat: true,
      });
    }
  };

  const sendDatalayerInfo = () => {
    sendDataLayer({datalayer: {event: 'prize_actions', text: 'Consultar mi progreso' },repeat: true})
    navigate('/progreso')
  }    

  return (
    <section ref={SectionCardsRef} className='SectionCards'>
      <Container className={'container-SectionCards'}>
        <article className="SectionContainer">
          <div className="sticky-title">
            <h4 className='line-title line-title-center-lg'>¿Qué incluye?</h4>
            <p className='subtitle mb-4'>
              Vive uno de los destinos más impresionantes del mundo, o llévate un bono para darte el gusto que quieras.
            </p>
            
            <div style={{bottom: '-230px'}} className="controls">
              <button className='hoverArrows' onClick={scrollUp} ><Icon name='arrow-up' /></button>
              <button className='hoverArrows' onClick={scrollDown} ><Icon name='arrow-down' /></button>
            </div>
          </div>

          <div className="scroll-content" ref={contentScrollRef}>
            {
              visibleItems.map((item, i) => (
                <div className="card" key={i}>
                  <img src={`/assets/images/${item.cardImg}`} alt={item.cardtitle} />
                  <div className="content-body-card">
                    <h3 className="card-title">{item.cardtitle}</h3>
                    <p className="card-description">{item.cardDescription}</p>
                  </div>
                  {/* La nota legal va al pie de cada una de las dos columnas, es
                      decir en las dos últimas tarjetas de la grilla. */}
                </div>
              ))
            }
          </div>
        </article>
      </Container>
    </section>
  )
}

export default SectionCards
