import React, {useState, useEffect} from 'react'
import {
  useNavigate
} from 'react-router-dom'

import VerticalCenter from './../../layouts/VerticalCenter/VerticalCenter'
import useWidth from './../../hooks/useWidth'

function Tour() {
  const [tourStep, setTourStep] = useState(0)
  const navigate = useNavigate()
  const { width } = useWidth()

  const steps = [
    {
      title: '¡Bienvenido(a) a más la usas, más ganas con tu PacifiCard!',
      content: '¡Ganar es fácil! Sigue estos pasos para maximizar tus beneficios y disfrutar de todas las recompensas que tenemos para ti.',
      page: '/mecanica',
      scroll: 0
    },
    {
      title: 'Conoce tu progreso',
      content: 'Aquí podrás visualizar tu meta y seguir tu progreso de manera sencilla.',
      page: '/mecanica',
      scroll: 0
    },
    {
      title: 'Catálogo de bonos',
      content: 'Aquí verás todos los bonos disponibles. ¡Completa tu meta y elige cuál quieres canjear!',
      page: '/mecanica',
      scroll: 0
    },
    {
      title: 'Más contenido',
      content: 'Aquí podrás acceder a contenido que te ayuda resolver dudas y conocer más sobre la campaña.',
      contextExtra: 'Términos y condiciones, preguntas frecuentes y mucho más.',
      page: '/mecanica',
      scroll: 0
    }, 
    {
      title: 'Tu avance',
      content: 'Aquí podrás  ver cuánto llevas y cuánto te falta para alcanzar tu meta.',
      page: '/progreso',
      scroll: 0
    },
    {
      title: 'Tu meta en comercios',
      content: 'Descubre los tipos de comercios que te ayudarán a alcanzar tu meta.',
      page: '/progreso',
      scroll: width > 992 ? 192 : 130
    },
    {
      title: 'Premio especial',
      content: 'Al finalizar la campaña, ¡este premio puede ser tuyo!',
      page: '/mecanica',
      scroll: 345
    },
  ]

  console.log("steps", steps)

  useEffect(() => {
    if (steps[tourStep]) {
      navigate(steps[tourStep].page)
    }
    window.scrollTo({top: 0, left: 0, behavior: 'smooth' })
    document.querySelector('body').classList.add('noscroll')
  }, [])

  const skip = () => {
    setTourStep(7)
    window.scrollTo({top: 0, left: 0, behavior: 'smooth' })
    localStorage.setItem('tourViewed', 'true')
    document.querySelector('body').classList.remove('noscroll')
  }

  const nextStep = () => {
    console.log("tourStep", tourStep)
    if (tourStep < 6) {
      navigate(steps[tourStep+1].page)
      window.scrollTo({top: steps[tourStep+1].scroll, left: 0, behavior: 'smooth' })
      setTourStep(tourStep+1)
    } else {
      skip()
    }
  }

  return (
    <div className={`mc-tour-container mc-tour-step-${tourStep}`}>
      <div className="mc-tour-container__overlays">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="mc-tour-container__window">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
          <path d="M13.5 2C13.5 1.17157 12.8284 0.5 12 0.5C11.1716 0.5 10.5 1.17157 10.5 2L13.5 2ZM10.9393 24.0607C11.5251 24.6464 12.4749 24.6464 13.0607 24.0607L22.6066 14.5147C23.1924 13.9289 23.1924 12.9792 22.6066 12.3934C22.0208 11.8076 21.0711 11.8076 20.4853 12.3934L12 20.8787L3.51472 12.3934C2.92893 11.8076 1.97918 11.8076 1.3934 12.3934C0.807611 12.9792 0.807611 13.9289 1.3934 14.5147L10.9393 24.0607ZM10.5 2L10.5 23L13.5 23L13.5 2L10.5 2Z" fill="#FDF2F8"/>
        </svg>
        {steps[tourStep] &&
          <VerticalCenter>
            <h2>
              {steps[tourStep].title}
            </h2>
            <p>
              {steps[tourStep].content}
            </p>
            {steps[tourStep].contextExtra &&
              <p>
                {steps[tourStep].contextExtra}
              </p>
            }
            <div className="mc-tour-container__window--actions">
              <button onClick={skip}>Omitir</button>
              <button onClick={nextStep}>
                {tourStep === 6 
                 ? 'Comenzar'
                 : 'Siguiente' 
                }
              </button>
            </div>
          </VerticalCenter>
        }

      </div>
    </div>
  )
}

export default Tour