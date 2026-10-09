import React from 'react'

function CommerceBanner(grupo) {
  return (
    <div className="mc-commerce-banner">
      <div className="mc-commerce-banner__content">
        <div className="mc-commerce-banner__text">
          <h3 className="mc-commerce-banner__title">
            {grupo.title}
          </h3>
          <p className="mc-commerce-banner__description">
            {grupo.description}
          </p>
        </div>
        <div className="mc-commerce-banner__image">
          <img src={`/assets/images/${grupo.image}.png`} />
        </div>
      </div>
    </div>
  )
}

export default CommerceBanner
