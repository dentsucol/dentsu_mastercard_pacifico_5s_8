import React from 'react'

function CommerceBanner({group}) {
  return (
    <div className="mc-commerce-banner">
      <div className="mc-commerce-banner__content">
        <div className="mc-commerce-banner__text">
          <h3 className="mc-commerce-banner__title">
            <div dangerouslySetInnerHTML={{ __html: group.title }} />
          </h3>
          <p className="mc-commerce-banner__description">
            {group.description}
          </p>
        </div>
        <div className="mc-commerce-banner__image">
          <img src={`/assets/images/${group.image}.png`} />
        </div>
      </div>
    </div>
  )
}

export default CommerceBanner
