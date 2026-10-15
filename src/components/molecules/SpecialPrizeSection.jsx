import React from 'react'

function SpecialPrizeSection({group}) {
  return (
    <div className="mc-special-prize-section">
      <div className="mc-special-prize-section__content">
        <div className="mc-special-prize-section__image">
          <img src={`/assets/images/${group.image}.png`} />
        </div>
        <div className="mc-special-prize-section__text">
          <p className="mc-special-prize-section__title">
            {group.title}
          </p>
          <p className="mc-special-prize-section__description">
            {group.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SpecialPrizeSection
