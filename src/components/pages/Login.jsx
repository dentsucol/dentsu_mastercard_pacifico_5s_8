import React from 'react'

// import Container from '../../layouts/Container/Container'
import LoginForm from '../organisms/LoginForm'
import SliderRotator from '../organisms/SliderRotator'

function Login({ autologin, hash, setGlobalLoader }) {
  return (
    <div className="mc-page login slow_ani">
      <div className="mc-section-login-group-1">
        <h3 className="h3-mobile ">
          Tu Tarjeta Mastercard Débito del Pacífico, está en todas{' '}
          <span>¡Úsala para ganar!</span>
        </h3>
        <div className="mc-section-login-form">
          <LoginForm
            title="Comienza a ganar"
            type="credentials"
            fields={[
              {
                field: 'onlyText',
                text: '<strong class="first_label">Escribe el código que recibiste por WhatsApp o abre el enlace que enviamos a tu correo</strong>'
              },
              {
                field: 'code',
                placeholder: 'XHL123...',
                maxlength: 8,
                separated: false
              },
              {
                field: 'onlyText',
                text: '<strong>¿No ves el enlace?</strong> Revisa tu bandeja de entrada o la carpeta de spam.'
              },
              {
                field: 'terms',
                label: 'He leído y acepto los',
                termsText: 'términos y condiciones',
                termsLink: '/terminos-y-condiciones'
              } // DO NOT CHANGE THIS LINE
            ]}
            buttonText="Ingresar"
            background="#fff"
            autologin={autologin}
            hash={hash}
            setGlobalLoader={setGlobalLoader}
          />
        </div>

        <div className="mc-section-login-slider">
          <h3 className="h3-desktop">
            Tu Tarjeta Mastercard Débito del Pacífico, está en todas{' '}
            <span>¡Úsala para ganar!</span>
          </h3>
          <SliderRotator
            mobileItemsToShow={1}
            desktopItemsToShow={3}
            showArrows={true}
            style={1}
            ext={true}
            list={[
              {
                id: 1,
                image: 'mechanic_slide_1.png',
                title: 'Encuentra el código enviado desde Banco Pacífico a tu <span>WhatsApp</span> o ingresa desde el enlace <span>enviado a tu correo</span>',
                titleDesktop: 'Regístrate con el código<span>que te enviamos por correo.</span>'
              },
              {
                id: 2,
                image: 'mechanic_slide_2.png',
                title:
                  'Usa tu Tarjeta Mastercard Débito del Pacífico en tus compras entre el <span>8 de octubre y el 2 de diciembre.</span>',
                titleDesktop:
                  'Usa tu Tarjeta Mastercard Débito del Pacífico en tus compras entre el <span>8 de octubre y el 2 de diciembre.</span>'
              },
              {
                id: 3,
                image: 'mechanic_slide_3.png',
                title:
                  '<span>Consulta tu meta y las categorías</span> en las que puedes comprar para cumplirla en la sección “Meta y progreso”.',
                titleDesktop:
                  '<span>Consulta tu meta y las categorías</span> en las que puedes comprar para cumplirla en la sección “Meta y progreso”.'
              },
              {
                id: 4,
                image: 'mechanic_slide_4.png',
                title:
                  '<span>Cumple tu meta, canjea tu bono</span> y participa por un premio especial al final de la campaña.',
                titleDesktop:
                  '<span>Cumple tu meta, canjea tu bono</span> y participa por un premio especial al final de la campaña.'
              },
              {
                id: 5,
                space: true
              }
            ]}
          />
        </div>
      </div>
    </div>
  )
}
export default Login
