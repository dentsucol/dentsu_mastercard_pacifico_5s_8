import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/molecules/bannerRedeemed.scss'
import Icon from '../atoms/Icon'
import { sendDataLayer } from '../../utils/functions'


function BannerRedeemed({type = "winner"}) {  

  const sendDataEvent = (textElement) => {
    console.log(textElement);
      sendDataLayer({
        datalayer: { event: 'progress', text: textElement, link: '/premios' },
        repeat: true
      })
    }


  return (
    <div className="mc-banner-redeemed">
      <div className="mc-banner-redeemed__content">
        <p>
          
          {type === "winner" ? 
          <>Tu bono ya está disponible para canjear.</> 
          : <><strong>¡Ya redimiste tu bono!</strong>Puedes consultar su detalle.</> 
          }
        </p>
      </div>
      
        {type === "winner" ? 
        <>
          <Link to="/premios" className="mc-banner-redeemed__btn" onClick={(e) => sendDataEvent("Canjear bono")}>
            <Icon name="gift_white" />Canjear bono
          </Link>
        </>
        : 
        <>
          <Link to="/mis-redenciones" className="mc-banner-redeemed__btn" onClick={(e) => sendDataEvent("Ir al historial de bonos")}>
            <Icon name="gift_white" />Ir al historial de bonos
          </Link>
        </>
        }
    </div>
  )
}

export default BannerRedeemed
