import React from 'react'

function CardBox({
  id,
  image,
  title,
  titleDesktop,
  desc,
  style,
  ext,
    arrow_forward_icon,
  arrow_right_icon
}) {

  return (
    <div className={`mc-cardbox-container cardBoxStyle-${style}`}>
      {image &&
        <div className='mc-cardbox-container__image'>
          {style === 1 && <span>{id}.</span>}
          <img src={`/assets/images/${image}`} alt="Step image" />
        </div>
      }
      {ext
        ? <h2>
            <strong>{id}.</strong>
            <div dangerouslySetInnerHTML={{ __html: title }} />
          </h2>
        : <h2>{title}</h2>
      }
      {titleDesktop &&
        <h4><div dangerouslySetInnerHTML={{ __html: titleDesktop }} /></h4>
      }
      {desc &&
        <div dangerouslySetInnerHTML={{ __html: desc }} />
      }
       {(arrow_forward_icon || arrow_right_icon) && (
        <div className='mc-cardbox-container__icons'>
          {arrow_forward_icon && (
            <img
              src={`/assets/icons/${arrow_forward_icon}`}
              alt="Arrow forward icon"
              className="icon-forward"
            />
          )}
          {arrow_right_icon && (
            <img
              src={`/assets/icons/${arrow_right_icon}`}
              alt="Arrow right icon"
              className="icon-right"
            />
          )}
        </div>
      )}
    </div>
  )
}

export default CardBox