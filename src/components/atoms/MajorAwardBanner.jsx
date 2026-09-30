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
      event: 'go_bond',
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
              <img src={`/assets/images/majorAward-mb-${context.user.segment.replace('Grupo ', '')}.png`} />
            : <img src={`/assets/images/majorAward-${context.user.segment.replace('Grupo ', '')}.png`} />
            }
            
          </Col>
          <Col>
            <h2 className='mc-major-award-banner__title'>
              {context && context.user.segment === 'Grupo 0' && 
                <p>Usa para todo tu Tarjeta Mastercard Débito del Pacífico y podrás llevarte uno de los
                  <span> 5 bonos de Amazon por US$ 100.</span>
                </p>
              }
              {context && context.user.segment === 'Grupo 1' && 
                <p>Usa tu Tarjeta Mastercard Débito del Pacífico para todo y podrás llevarte 
                  <span> un bono de Amazon o Megamaxi por US$ 500.</span>
                </p>
              }
              {context && context.user.segment === 'Grupo 2' && 
                <>
                  <p>Usa tu Tarjeta Mastercard Débito del Pacífico para todo y podrás llevarte 
                    <span> un bono de Amazon o Megamaxi por US$ 1.000.</span>
                  </p>
                </>
              }
              {context && context.user.segment === 'Grupo 3' && 
                <>
                  <p>Usa tu Tarjeta Mastercard Débito del Pacífico para todo y podrás llevarte 
                    <span> un bono de Amazon o Megamaxi por US$ 1.500.</span>
                  </p>
                </>
              }
              {context && context.user.segment === 'Grupo 4' && 
                <>
                  <p>Usa tu Tarjeta Mastercard Débito del Pacífico para todo y podrás ganar:
                    <span> un bono de Amazon o Megamaxi por US$ 3.000 o un crucero Royal Caribbean para 4 personas.</span>
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