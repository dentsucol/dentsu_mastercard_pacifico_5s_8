import React from 'react'
import { useNavigate } from 'react-router-dom'

function Button({
  type,
  text,
  loading,
  status,
  dataEvent,
  onClick,
  link,
  icon,
  awardIcon,
  redirect,
  external,
  className,
  disabled  // ← agregar
}) {
  const navigate = useNavigate()
  const handler = () => {
    if (disabled) return  // ← bloquea el clic si está disabled

    if ((status === 'active' || status) && !loading) {
      link
        ? external
          ? window.open(link, '_blank')
          : navigate(link)
        : onClick
          ? onClick()
          : console.log("No se ejecuta nada")
    }

    if (status && redirect) {
      window.location.href = redirect
    }
  }

  return (
    <div
      className={`mc-button-container mc-button-container__${type}`}
      onClick={handler}
    >
      <button
        disabled={loading || status === 'inactive' || disabled}
        className={`slow_ani mc-button-container__status--${status} ${disabled ? 'mc-button-container__disabled' : ''}`}
        data-gtm-event={dataEvent}
      >
        {loading
          ? <img src='/assets/images/preloader_1.gif' alt='loader' className='inline-loader' />
          : <>
              {(status === 'inactive' && icon) ? <img src={`/assets/images/${icon}`} className='inline-block' /> : ''}
              {(status === 'active' && awardIcon) ? <img src={`/assets/images/${awardIcon}`} className='inline-block' /> : ''}
              {text}
            </>
        }
      </button>
    </div>
  )
}

export default Button