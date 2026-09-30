import React from 'react'

import SliderRotator from './SliderRotator'

function Benefits({
  type
}) {

  return (
    <div className={`mc-benefits-container`}>
      <div className='mc-benefits-container__head'>
        <div>Beneficios de tu</div>
        <div>Tarjeta Mastercard Débito del Pacífico</div>
      </div>
      <div className='mc-benefits-container__slide'>
        <SliderRotator
          mobileItemsToShow={1}
          desktopItemsToShow={3}
          style={type}
          ext={true}
          Benefits={true}
          infinite={false}
          showArrows={true}
          list={
            [
              {
                id: 1,
                image: "benefit_slide_1.png",
                title: "Realiza compras en tiendas <span>físicas y por internet.</span>",
                titleDesktop: "Realiza compras en tiendas <span>físicas y por internet.</span>"
              },
              {
                id: 2,
                image: "benefit_slide_2.png",
                title: '<span>Cuenta con la seguridad que necesitas para pagar</span> tus compras en más de 30 millones de comercios en el mundo.',
                titleDesktop: '<span>Cuenta con la seguridad que necesitas para pagar</span> tus compras en más de 30 millones de comercios en el mundo.',
              },
              {
                id: 3,
                image: "benefit_slide_3.png",
                title: 'Controla tus gastos y movimientos en <span>cajeros automáticos, kioskos virtuales, Banca virtual Intermático o Banca Móvil.</span>',
                titleDesktop: 'Controla tus gastos y movimientos en <span>cajeros automáticos, kioskos virtuales, Banca virtual Intermático o Banca Móvil.</span>'
              },
              // {
              //   id: 4,
              //   image: "benefit_slide_4.png",
              //   title: "Accede a promociones exclusivas de <span>Mastercard, Banco del Pacífico y PacifiCard.</span>",
              //   titleDesktop: "Accede a promociones exclusivas de <span>Mastercard, Banco del Pacífico y PacifiCard.</span>"
              // },
              // {
              //   id: 5,
              //   image: "benefit_slide_5.png",
              //   title: "<span>Disfruta de precios especiales y descuentos</span> en comercios seleccionados por Mastercard.",
              //   titleDesktop: "<span>Disfruta de precios especiales y descuentos</span> en comercios seleccionados por Mastercard."
              // },
              // {
              //   id: 6,
              //   image: "benefit_slide_6.png",
              //   title: "Reporta pérdida o robo con <span>Mastercard Global Service 24/7</span> y solicita la ubicación de tu cajero automático más cercano.",
              //   titleDesktop: "Reporta pérdida o robo con <span>Mastercard Global Service 24/7</span> y solicita la ubicación de tu cajero automático más cercano."
              // }
            ]
          }
        />
      </div>
    </div>
  )
}

export default Benefits