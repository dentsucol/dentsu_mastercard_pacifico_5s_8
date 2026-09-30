import React from 'react'

function TextImageBox({
  boxType,
  image,
  content
}) {

  return (
    <div className={`mc-image-text-container mc-image-text-container-type-${boxType}`}>

      {image &&
        <div className='mc-image-text-container__colImage'>
          <img src={`/assets/images/${image}`} alt="Card image" />
        </div>
      }
      {content && 
        <div className='mc-image-text-container__colText'>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      }
      
    </div>
  )
}

export default TextImageBox