import React from 'react'
import Container from '../../layouts/Container/Container'

const MicroBanner = () => {
  return (
    <div className='MicroBanner'>
        <Container>
            <div className="banner_content">
                <div className="banner_header">
                    <div className="banner_img">
                        <img src="/assets/images/modal-superPower.png" alt="" />
                    </div>
                    <div className="banner_title">
                        <h3>¡Tus compras tienen superpoderes! 🛍️</h3>
                    </div>
                </div>
                <div className="banner_body">
                    <p>Solo del 11 al 13 de Octubre, cada compra que hagas se multiplicará por dos.</p>
                    <p>¡No dejes pasar esta oportunidad de cumplir tu meta más rápido y GANAR un bono!</p>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default MicroBanner
