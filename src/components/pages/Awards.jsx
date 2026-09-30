import React, { useContext, useEffect, useState } from 'react'

import { StateController } from './../../App'

import Container from '../../layouts/Container/Container'
import AwardsGallery from '../organisms/AwardsGallery'
import Preloader from '../atoms/Preloader'
import MajorAwardBanner from '../atoms/MajorAwardBanner'
import InfoCatalog from '../atoms/InfoCatalog'

import { getMaximumBlock } from '../../utils/functions'
import CustomModal from '../molecules/CustomModal'

function Awards() {
  const [awards, setAwards] = useState(false)
  const [canRedem, setCanRedem] = useState(false)
  const { context } = useContext(StateController)
  const [award_exhausted, setAward_exhausted] = useState(false)

  useEffect(() => {
    if (context && context.awards) {
      setAwards(context.awards[`block_1`].awards)
      setCanRedem(context.awards[`block_1`].canRedem)
    }
  }, [context.awards])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  console.log('award_exhausted', award_exhausted)

  return (
    <div className="mc-page awards inner slow_ani">
      {/*
      <Container>
        <h1>
          Catálogo de <span>bonos</span>
        </h1>
        {context && (
          <p>
            {context.awards[`block_1`].canRedem
              ? '¡Tu bono digital está listo para ser canjeado!'
              : 'Aún no has alcanzado tu meta. Una vez que llegues a la meta, el botón de canjear estará disponible.'}
          </p>
        )}
        <InfoCatalog
          dateText={context && context.tracing ? context.tracing.date_update : '14/05/2026'}
        />
      </Container>
      */}

      <Container>
        {/*awards ? (
          <AwardsGallery
            setAward_exhausted={setAward_exhausted}
            awardBoxType={2}
            itemsPerLine={3}
            limit={false}
            limitButtonText="Ver más comercios"
            showStock={false}
            list={awards}
            steps={false}
            canRedem={canRedem}
            twoStepAuth={false}
            redemtionText="Canjear bono"
            termText='Este bono está sujeto a los <a href="/terminos-y-condiciones">términos y condiciones</a> del comercio aliado.</a>'
            termLink="/terminos-y-condiciones"
          />
        ) : (
          <Preloader type="section" invert />
        )*/}

        <MajorAwardBanner context={context} from="/premios" />
      </Container>
      {/* {
  award_exhausted &&
      <CustomModal
        global
        title="Bonos agotados"
        desc="Ya no te quedan bonos para redimir, pero sigue pagando con tu Tarjeta Mastercard Débito del Pacífico."
        cta="Aceptar"
        icon={false}
        primaryAction={
          {
            action: setAward_exhausted,
            buttonText: 'Cerrar',
            loading: false
          }
        }
        show={award_exhausted} setShowModal={setAward_exhausted}
      />
} */}
    </div>
  )
}
export default Awards
