import React, { useContext, useState, useEffect } from 'react'
import { StateController } from './../../App'

import Container from '../../layouts/Container/Container'
import SliderRotator from '../organisms/SliderRotator'
import TestQuestions from '../organisms/TestQuestions'
import MajorAwardBanner from '../atoms/MajorAwardBanner'
import CustomModal from '../molecules/CustomModal'
import { getDateNow } from '../../utils/functions'

function Mechanic() {
  const { context } = useContext(StateController)
  const [pushModal, setPushModal] = useState(true)
  const [pushModalSupermarket, setPushModalSupermarket] = useState(false)
  const [modalSuperPower, setModalSuperPower] = useState(true)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (context && context.tracing && context.tracing.extra === '1') {
      setPushModalSupermarket(true)
    }
  }, [context.tracing])

  return (
    <div className="mc-page mechanic inner slow_ani">
      <Container>
        <h1>¿Cómo ganar?</h1>

        <p className="mc-steps-title">
          Sigue estos pasos y déjale el resto a tu Tarjeta Mastercard Débito del Pacífico:
        </p>

        <div className="mc-section-login-slider">
          <SliderRotator
            mobileItemsToShow={1}
            desktopItemsToShow={3}
            style={1}
            ext={true}
            showArrows={true}
            list={[
              // {
              //   id: 1,
              //   image: "mechanic_slide_1.png",
              //   title: "<span>Regístrate con el código</span> que te enviamos por correo.",
              //   titleDesktop: "<span>Regístrate con el código</span> que te enviamos por correo."
              // },
              {
                id: 1,
                image: 'mechanic_slide_1.png',
                title:
                  'Usa tu Tarjeta Mastercard Débito del Pacífico para pagar tus compras entre el <span>8 de octubre y el 2 de diciembre.</span>',
                titleDesktop:
                  'Usa tu Tarjeta Mastercard Débito del Pacífico para pagar tus compras entre el 8 de octubre y el 2 de diciembre.'
              },
              {
                id: 2,
                image: 'mechanic_slide_3.png',
                title:
                  '<span>Consulta tu meta y las categorías</span> en las que puedes comprar para cumplirla en la sección “Meta y progreso”.',
                titleDesktop:
                  'Consulta tu meta y las categorías en las que puedes comprar para cumplirla en la sección “Meta y progreso”.'
              },
              {
                id: 3,
                image: 'mechanic_slide_4.png',
                title:
                  '<span>Cumple tu meta, canjea tu bono</span> y participa por un premio especial al final de la campaña.',
                titleDesktop:
                  'Cumple tu meta, canjea tu bono y participa por un premio especial al final de la campaña.'
              }
            ]}
          />
        </div>

        <div>
          <a className="button_progress_link" href="/progreso" data-gtm-event="mechanics_btn">
            <button className="standard_buttom_primary">Consulta tu progreso</button>
          </a>
        </div>

        <MajorAwardBanner context={context} from="/mecanica" />

        <div className="mc-section-testForm custom-context">
          <style>{`
          @media (max-width: 768px) {
            .mc-section-testForm.custom-context h4 {
              font-size: 18px;
            }
          }
        `}</style>
          <TestQuestions
            context={context}
            quizNumber={2}
            title="¿Este contenido te ayudó a entender la dinámica de la campaña?"
          />
        </div>
      </Container>
      {context?.redemtions?.length > 100 && context?.tracing && context?.tracing?.extra !== '1' && (
        <CustomModal
          title="¡Lo lograste! <br /> Canjeaste tu bono"
          desc="¡Ganas al ser el cliente que más veces cumple su meta o al acumular la mayor facturación al final de la campaña!"
          subDescription
          cta="Aceptar"
          icon={false}
          push
          context={context}
          image="img_push_modal.png"
          primaryAction={{
            action: setPushModal,
            buttonText: 'Quiero más premios',
            loading: false
          }}
          show={pushModal}
          setShowModal={setPushModal}
        />
      )}

      {/* <CustomModal
        title="Tus compras en Hipermarket te dan más beneficios"
        desc="<strong>Del 15 al 10 de noviembre de 2024</strong>, al realizar una compra* en <strong>Hipermarket</strong> con tu PacifiCard, ¡recibirás un bono* de este comercio!"
        subDescription
        cta="Aceptar"
        icon={false}
        push
        context={context}
        image="img_push_modal.png"
        show={pushModalSupermarket} setShowModal={setPushModalSupermarket}
        isSupermarket={true}
      /> */}

      {context?.tracing?.extra &&
        context?.tracing?.extra === '1' &&
        modalSuperPower &&
        getDateNow() >= '2024-10-10' &&
        getDateNow() <= '2024-10-13' && (
          <CustomModal
            title="¡Tus compras tienen superpoderes! 🛍️"
            desc={`<strong>Solo del 11 al 13 de Octubre</strong>, cada compra que hagas se multiplicará por dos. <br /> <br /> ¡No dejes pasar esta oportunidad de <strong>cumplir tu meta más rápido y GANAR un bono!</strong>`}
            cta="Quiero más premios"
            icon={false}
            push
            context={context}
            image="modal-superPower.png"
            modalSuperPower
            primaryAction={{
              action: setModalSuperPower,
              buttonText: 'Quiero más premios',
              loading: false
            }}
            show={modalSuperPower}
            setShowModal={setModalSuperPower}
          />
        )}
    </div>
  )
}
export default Mechanic
