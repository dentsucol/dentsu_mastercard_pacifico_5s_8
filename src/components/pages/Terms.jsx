import React, { useEffect, useState, useContext } from 'react'

import { StateController } from './../../App'
import Container from '../../layouts/Container/Container'
import Preloader from '../atoms/Preloader'
import BackButton from '../atoms/BackButton'

function Terms() {
  const { staticContent } = useContext(StateController)
  const [termsHTML, setTermsHTML] = useState(false)

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (staticContent && staticContent.terms && staticContent.terms[0].content) {
      setTermsHTML(staticContent.terms[0].content)
    }
  }, [staticContent])
  
  return (
    <div className='mc-page terms inner slow_ani'>
      
      <Container>
        <BackButton />

        <h1>Términos y condiciones</h1>
        {/* <p className='center-text'>
          <strong>CAMPAÑA</strong><br />
          <strong>{'"'}Más la Usas, Más Ganas{'"'}</strong><br />
          Banco del Pacífico S.A. - Mastercard
        </p> */}
        <p className='center-text'>
          <strong>CAMPAÑA TU MASTERCARD DÉBITO DEL PACÍFICO  {'"'}ESTÁ EN TODAS{'"'}</strong><br />
          {/* Banco del Pacífico S.A. - Mastercard */}
        </p>

        {termsHTML
          ? <div className='mc-static-content'>
              <div dangerouslySetInnerHTML={{ __html: termsHTML }} />
            </div>
          : <Preloader
              type="section"
              invert
            />
        }
      </Container>

    </div>
  )
}
export default Terms