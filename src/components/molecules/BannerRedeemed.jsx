import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/molecules/bannerRedeemed.scss'
import Icon from '../atoms/Icon'

function BannerRedeemed({type = "winner"}) {
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
          <Link to="/premios" className="mc-banner-redeemed__btn">
            <Icon name="gift_white" />Canjear  bono
          </Link>
        </>
        : 
        <>
          <Link to="/mis-redenciones" className="mc-banner-redeemed__btn">
            <Icon name="gift_white" />Ir al historial de bonos
          </Link>
        </>
        }
    </div>
  )
}

export default BannerRedeemed
