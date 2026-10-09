import React from 'react'

function SpecialPrizeSection() {
  return (
    <div className="mc-special-prize-section">
      <div className="mc-special-prize-section__content">
        <div className="mc-special-prize-section__image">
          <img
            src="/assets/images/premio-especial-bodegon.png"
            alt="Premios especiales: auriculares, tarjeta Amazon, Tipti"
          />
        </div>
        <div className="mc-special-prize-section__text">
          <p className="mc-special-prize-section__title">
            Enamórate de tu premio especial y descubre cómo llevártelo.
          </p>
          <p className="mc-special-prize-section__description">
            ¿Ya cumpliste tu meta? ¡Rápido! Podrías ser uno de los ganadores.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SpecialPrizeSection
