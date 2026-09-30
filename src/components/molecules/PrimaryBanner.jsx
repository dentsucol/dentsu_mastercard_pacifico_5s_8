import React from 'react'

function PrimaryBanner({
  image
}) {

  return (
    <div className='mc-banner-container'>
      <img src={`/assets/images/${image}`} alt="Banner principal" />
    </div>
  )
}

export default PrimaryBanner