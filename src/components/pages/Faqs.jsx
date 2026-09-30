import React, { useEffect, useContext } from 'react'

import { StateController } from './../../App'
import Container from '../../layouts/Container/Container'
import FaqsFeed from '../organisms/FaqsFeed'
import Preloader from '../atoms/Preloader'
import BackButton from '../atoms/BackButton'

function Faqs() {
  const { staticContent } = useContext(StateController)

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className='mc-page faqs inner slow_ani'>

      <Container>
        <BackButton />

        {/* <h1>Preguntas Frecuentes Campaña Tarjeta Mastercard Débito del Pacífico</h1>
        <p>
          <strong>{'"'}Más la Usas, Más Ganas{'"'}</strong><br />
          Banco del Pacífico S.A. - Mastercard
        </p> */}
          <h1>Preguntas Frecuentes </h1>
        <p>
          <strong>CAMPAÑA TU MASTERCARD DÉBITO DEL PACÍFICO {'"'}ESTÁ EN TODAS{'"'}</strong><br />
          {/* Banco del Pacífico S.A. - Mastercard */}
        </p>

        {staticContent
          ? <FaqsFeed
              faqsType={1}
              list={staticContent.faqs}
            />
          : <Preloader
              type="section"
              invert
            />
        }
      </Container>
      
    </div>
  )
}
export default Faqs