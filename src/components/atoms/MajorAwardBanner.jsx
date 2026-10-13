import React from 'react'
import Columns, { Col } from '../../layouts/Columns/Columns'
import { sendDataLayer } from '../../utils/functions'
import { Link } from 'react-router-dom'
import useWidth from '../../hooks/useWidth'

function MajorAwardBanner({
  context,
  from
}) {
  const { width } = useWidth()
  const goBondDatalayer = (e) => {
    sendDataLayer({datalayer: {
      event: 'jackpot',
      text: 'Quiero el premio mayor',
      site_url: from,
      link: '/premio-mayor'
    },repeat: true})
  }

  return (
    <div className={`mc-major-award-banner`}>
      {context &&
        <Columns
          desktop={2}
          mobile={1}
          height={200}
        >
          <Col>
            {width < 992 ? 
              <img src={`/assets/images/majorAward-${context.user.segment.replace('Grupo ', '')}.png`} />
            : <img src={`/assets/images/majorAward-${context.user.segment.replace('Grupo ', '')}-lg.png`} />
            }
            
          </Col>
          <Col>
            <h2 className='mc-major-award-banner__title'>
              {context && context.user.segment === 'Grupo 1' && 
                <p><span>¡Tus audífonos o tu bono están cada vez más cerca!</span>
                  Con cada meta de facturación que cumplas, avanzas hacia unos audífonos Apple o Bose, o un bono Amazon o Tipti por US$500.
                </p>
              }
              {context && context.user.segment === 'Grupo 2' && 
                <p><span>¡Tu nuevo celular o tu bono están cada vez más cerca!</span>
                  Con cada meta de facturación que cumplas, avanzas hacia un iPhone 18 o Samsung S26 Ultra, o un bono Amazon o Tipti por US$1,000.
                </p>
              }
              {context && context.user.segment === 'Grupo 3' && 
                <>
                  <p><span>Machu Picchu o US$1,500, tu premio te espera</span>
                    Con cada meta de facturación que cumplas, avanzas hacia un viaje a Machu Picchu para 2, o un bono Amazon o Tipti por US$1,500.
                  </p>
                </>
              }
              {context && context.user.segment === 'Grupo 4' && 
                <>
                  <p><span>Rio de Janeiro o US$3,000, tu premio te espera</span>
                    Con cada meta de facturación que cumplas, avanzas hacia un viaje a Rio de Janeiro para 2, o un bono Amazon o Tipti por US$3,000.
                  </p>
                </>
              }
              {context && context.user.segment === 'Grupo 0' && 
                <>
                  <p><span>¡Tus audífonos o tu bono están cada vez más cerca!</span>
                    Con cada meta de facturación que cumplas, avanzas hacia unos audífonos Apple o Bose, o un bono Amazon o Tipti por US$500.
                  </p>
                </>
              }
            </h2>
            <Link to="/premio-mayor" onClick={goBondDatalayer} data-gtm-event="jackpot">Quiero el premio especial</Link>
          </Col>
        </Columns>
      }
    </div>
  )
}

export default MajorAwardBanner