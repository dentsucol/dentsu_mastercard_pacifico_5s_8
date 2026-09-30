import React from 'react'
import { Link } from "react-router-dom"

import Container from '../Container/Container'
import { sendDataLayer } from '../../utils/functions'
import VerticalCenter from '../VerticalCenter/VerticalCenter'

function Footer({
  footerType,
  footerCardsImg,
  secondaryFooterImg,
  links,
  linksText,
  content,
  bankFooterImg,
  copyright
}) {

  return (
    <div className={`mc-footer-container mc-footer-container-type-${footerType}`}>
      {footerType === 1 && footerCardsImg &&
        <img src={`/assets/images/${footerCardsImg}`} alt="Footer Cards" className='mc-footer-container__cards' />
      }
      {footerType === 1 && 
        <div className='mc-footer-container__bg'>
          <Container>
            <div className='mc-footer-container__section'>
              {linksText && <div dangerouslySetInnerHTML={{ __html: linksText }} />}
              {links && links[0] &&
                <ul className='mc-footer-container__section--links'>
                  {links.map((link, index) => {
                    return (
                      <Link data-gtm-event="footer"
                        onClick={(e) =>{
                          sendDataLayer({datalayer: {event: "footer", text: e.target.textContent,link: window.location.href},repeat: true})
                        }}
                        key={index}
                        to={link.link} 
                      >{link.text}</Link>
                    )
                  })}
                </ul>
              }
              <img 
                src={`/assets/images/footerBrand.png`} 
                alt="Footer" 
                className='mc-footer-container__brand'
              />
            </div>
          </Container>
            <Container className="mc-footer-container__text">
              <h4>Canales de atención Banco del Pacífico</h4>

              <div className='mc-footer-contact'>
                <div className='mc-footer-contact__image'>
                  <img src='/assets/images/phone_icon.png' />
                </div>
                <div className='mc-footer-contact__labels'>
                  <VerticalCenter>
                    <strong>Contact center</strong>
                    <p>04 373 1500</p>
                  </VerticalCenter>
                </div>
              </div>
              <div className='mc-footer-container__subbg'>
                  <Container>
                    {copyright}
                  </Container>
                </div>
              <img
                src="/assets/images/vigilated.png"
                className="mc-footer-vigilated" alt="Footer logos"
              />
            </Container>
        </div>
      }

      {footerType === 2 && bankFooterImg &&
        <div className='mc-footer-container__bg'>
          <Container>
            <img 
              src={`/assets/images/${bankFooterImg}`} 
              alt="Banco Footer" 
              className='mc-footer-container__bg--image'
            />
            <div className='mc-footer-container__sections'>
              <div className='mc-footer-container__sections--section'>
                <h4>Información:</h4>
                {links && links[0] &&
                  <ul className='mc-footer-container__section--links'>
                    {links.map((link, index) => {
                      return (
                        <Link 
                          key={index}
                          to={link.link} 
                        >{link.text}</Link>
                      )
                    })}
                  </ul>
                }
              </div>
              <div className='mc-footer-container__sections--section'>
                <h4>Contacto:</h4>
                <p>xxxxxxxxxxxx</p>
              </div>
            </div>

            {secondaryFooterImg &&
              <img 
                src={`/assets/images/${secondaryFooterImg}`} 
                alt="Footer" 
                className='mc-footer-container__image'
              />
            }
          </Container>

          <Container className="mc-footer-container__text">
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <img
              src="/assets/images/vigilated.png"
              className="mc-footer-vigilated" alt="Footer logos"
            />
          </Container>
        </div> 
      } 

      {footerType === 3 && 
        <div className='mc-footer-container__bg'>
          {footerCardsImg &&
            <img src={`/assets/images/${footerCardsImg}`} alt="Footer Cards" className='mc-footer-container__cards' />
          }

          <Container>
            <img 
              src={`/assets/images/${bankFooterImg}`} 
              alt="Banco Footer" 
              className='mc-footer-container__bg--image'
            />

            <div className='mc-footer-container__section'>
              {links && links[0] &&
                <ul className='mc-footer-container__section--links'>
                  {links.map((link, index) => {
                    return (
                      <Link 
                        key={index}
                        to={link.link} 
                      >{link.text}</Link>
                    )
                  })}
                </ul>
              }
              {secondaryFooterImg &&
                <img 
                  src={`/assets/images/${secondaryFooterImg}`} 
                  alt="Footer" 
                  className='mc-footer-container__image'
                />
              }
            </div>
          </Container>

          <Container className="mc-footer-container__text">
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <img
              src="/assets/images/vigilated.png"
              className="mc-footer-vigilated" alt="Footer logos"
            />
          </Container>

          <Container>
            <div className='mc-footer-container__subbg'>
              {copyright}
            </div>
          </Container>
            
        </div> 
      }

      {footerType === 4 && 
        <Container>
          <div className='mc-footer-container__section'>
            {links && links[0] &&
              <ul className='mc-footer-container__section--links'>
                {links.map((link, index) => {
                  return (
                    <Link 
                      key={index}
                      to={link.link} 
                    >{link.text}</Link>
                  )
                })}
              </ul>
            }
            {secondaryFooterImg &&
              <img 
                src={`/assets/images/${secondaryFooterImg}`} 
                alt="Footer" 
                className='mc-footer-container__image'
              />
            }
          </div>
        </Container>
      }

      {footerType === 4 && 
        <Container className="mc-footer-container__text">
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <img
            src="/assets/images/vigilated.png"
            className="mc-footer-vigilated" alt="Footer logos"
          />

          <img 
            src={`/assets/images/${bankFooterImg}`} 
            alt="Banco Footer" 
            className='mc-footer-container__bg--image'
          />
        </Container>
      }

      {footerType === 5 && 
        <div className='mc-footer-container__bg'>
          <Container>
            <img 
              src={`/assets/images/${bankFooterImg}`} 
              alt="Banco Footer" 
              className='mc-footer-container__bg--image'
            />
            <div className='mc-footer-container__sections'>
              <div className='mc-footer-container__sections--section'>
                <h4>Información:</h4>
                {links && links[0] &&
                  <ul className='mc-footer-container__section--links'>
                    {links.map((link, index) => {
                      return (
                        <Link 
                          key={index}
                          to={link.link} 
                        >{link.text}</Link>
                      )
                    })}
                  </ul>
                }
              </div>
              <div className='mc-footer-container__sections--section'>
                <h4>Contacto:</h4>
                <p>Bogotá: (601) 444 1777</p>
                <p>Cali: (602) 885 9595</p>
                <p>Medellín: (604) 325 6000</p>
                <p>Línea nacional: 01 8000 518 000</p>
              </div>
            </div>

            {secondaryFooterImg &&
              <img 
                src={`/assets/images/${secondaryFooterImg}`} 
                alt="Footer" 
                className='mc-footer-container__image'
              />
            }
          </Container>

          <Container className="mc-footer-container__text">
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <img
              src="/assets/images/vigilated.png"
              className="mc-footer-vigilated" alt="Footer logos"
            />
          </Container>
        </div> 
      }
    </div>
  )
}

export default Footer