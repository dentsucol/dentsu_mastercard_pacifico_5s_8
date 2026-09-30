import React from 'react'
import { connect } from 'react-redux'

import Container from '../layouts/Container/Container'

import Header from '../layouts/Header/Header'
import Footer from '../layouts/Footer/Footer'
import LoginForm from './organisms/LoginForm'
import AwardsGallery from './organisms/AwardsGallery'
import AlliancesGallery from './organisms/AlliancesGallery'
import FaqsFeed from './organisms/FaqsFeed'
import TextImageBox from './organisms/TextImageBox'
import ProgressBar from './atoms/ProgressBar'
import ProgressCircle from './atoms/ProgressCircle'
import SliderRotator from './organisms/SliderRotator'

function DemoComponents() {

  return (
    <div className='demo-components'>
      <Header
        headerType={1}
        logo="logoPacifico.png"
        items={[
          {page: 'item', title: 'Como ganar', icon: 'icon', sublevel: false},
          {page: 'item', title: 'Progreso', icon: 'icon', sublevel: false},
          {page: 'item', title: 'Premios', icon: 'icon', sublevel: false},
          {page: 'item', title: 'Más', icon: 'icon', sublevel: true, children: [
            {page: 'item', title: 'Item'},
            {page: 'item', title: 'Item'},
            {page: 'item', title: 'Item'}
          ]}
        ]}
        // submenu={{
        //   type: "nickname",
        //   nickname: "Santiago Meneses",
        //   default: "A"
        // }}
        notifications={
          [
            {
              id: 1,
              title: "Notification",
              content: "html content",
              status: 0
            }
          ]
        }
      />
      {/* <Header
        headerType={2}
        logo="logo.png"
        items={[
          {page: 'item', title: 'Item', icon: 'item', sublevel: false},
          {page: 'item', title: 'Item', icon: 'item', sublevel: false},
          {page: 'item', title: 'Item', icon: 'item', sublevel: false},
          {page: 'item', title: 'Item', icon: 'item', sublevel: true},
          {page: 'item', title: 'Item', icon: 'item', sublevel: true},
          {page: 'item', title: 'Item', icon: 'item', sublevel: true}
        ]}
        submenu={{
          type: "labels",
          content: `Vigencia de la campaña <br> del 2 de noviembre al 23 de diciembre de 2023.`,
          icon: "test"
        }}
      />
      <Header
        headerType={3}
        items={[
          {page: 'item', title: 'Item', icon: 'item', sublevel: false},
          {page: 'item', title: 'Item', icon: 'item', sublevel: false},
          {page: 'item', title: 'Item', icon: 'item', sublevel: false},
          {page: 'item', title: 'Item', icon: 'item', sublevel: true},
          {page: 'item', title: 'Item', icon: 'item', sublevel: true},
          {page: 'item', title: 'Item', icon: 'item', sublevel: true}
        ]}
        logo="logo.png"
      /> */}

      {/* <LoginForm
        title="Título corto"
        type="credentials"
        fields={[
          {
            field: "document",
            label: "Ingresa los últimos 5 digitos",
            placeholder: "Últimos 5 digitos",
            maxlength: 5
          },
          {
            field: "birthdate",
            label: "Fecha de nacimiento",
            placeholder: "DD/MM/AAAA"
          },
          {
            field: "terms",
            label: "He leído y acepto los",
            termsText: "Términos y condiciones",
            termsLink: "/terminos-y-condiciones"
          }
        ]}
        buttonText="Ingresa"
        background="#fff"
      /> */}
      <LoginForm
        title="Título corto"
        type="credentials"
        fields={[
          {
            field: "code",
            label: "Ingresa tu código",
            placeholder: "xxxxxxxxx",
            maxlength: 9
          },
          {
            field: "terms",
            label: "He leído y acepto los",
            termsText: "Términos y condiciones",
            termsLink: "/terminos-y-condiciones"
          }
        ]}
        buttonText="Entrar"
        background="#fff"
      />

      <Container>

        {/* <div className='demo-section'>
          <AwardsGallery
            awardBoxType={1}
            itemsPerLine={3}
            limit={false}
            limitButtonText="Ver más comercios"
            list={
              [
                {
                  id: 1,
                  name: "Comercio prueba",
                  price: 40000,
                  image: "award.png"
                },
                {
                  id: 1,
                  name: "Comercio prueba 2",
                  price: 40000,
                  image: "award.png"
                },
                {
                  id: 1,
                  name: "Comercio prueba 2",
                  price: 40000,
                  image: "award.png"
                },
                {
                  id: 1,
                  name: "Comercio prueba 2",
                  price: 40000,
                  image: "award.png"
                }
              ]
            }
            redemtionText="Redimir bono"
            termText="Términos y condiciones"
            termLink="/terminos-y-condiciones"
          />
        </div> */}

        {/* <div className='demo-section'>
          <AwardsGallery
            awardBoxType={1}
            itemsPerLine={3}
            steps={
              [
                {
                  name: "Oportunidad 1",
                  awards: [
                    {
                      id: 1,
                      name: "Comercio prueba",
                      price: 40000,
                      image: "award.png"
                    },
                    {
                      id: 1,
                      name: "Comercio prueba 2",
                      price: 40000,
                      image: "award.png"
                    }
                  ]
                },
                {
                  name: "Oportunidad 2",
                  awards: [
                    {
                      id: 1,
                      name: "Comercio prueba",
                      price: 40000,
                      image: "award.png"
                    },
                    {
                      id: 1,
                      name: "Comercio prueba 2",
                      price: 40000,
                      image: "award.png"
                    }
                  ]
                }
              ]
            }
            redemtionText="Redimir"
            termText="Aplican términos y condiciones."
            termLink="/terminos-y-condiciones"
          />
        </div> */}

        {/* <div className='demo-section'>
          <ProgressBar
            percent={55}
            label={`10/25`}
          />
        </div>

        <div className='demo-section'>
          <ProgressCircle
            percent={25}
            label={`Llevas $40.000 de $100.000`}
            icon="icon"
          />
        </div> */}

        {/* <div className='demo-section'>
          <SliderRotator
            mobileItemsToShow={1}
            desktopItemsToShow={3}
            list={
              [
                {
                  id: 1,
                  image: "step.png",
                  title: "Title Card",
                  desc: "Lorem Ipsum html text here"
                },
                {
                  id: 2,
                  image: "step.png",
                  title: "Title Card",
                  desc: "Lorem Ipsum html text here"
                },
                {
                  id: 3,
                  image: "step.png",
                  title: "Title Card",
                  desc: "Lorem Ipsum html text here"
                },
                {
                  id: 4,
                  image: "step.png",
                  title: "Title Card",
                  desc: "Lorem Ipsum html text here"
                }
              ]
            }
          />
        </div> */}

        {/* <div className='demo-section'>
          <AlliancesGallery
            alliedBoxType={1}
            itemsPerLine={3}
            limit={3}
            limitButtonText="Ver todos los aliados"
            list={
              [
                {
                  id: 1,
                  name: "Comercio prueba",
                  description: 'description...',
                  rule: '30% OFF',
                  image: "award.png"
                },
                {
                  id: 1,
                  name: "Comercio prueba",
                  description: 'description...',
                  rule: '30% OFF',
                  image: "award.png"
                },
                {
                  id: 1,
                  name: "Comercio prueba",
                  description: 'description...',
                  rule: '30% OFF',
                  image: "award.png"
                }
              ]
            }
            termText="Aplican términos y condiciones."
            termLink="/terminos-y-condiciones"
          />
        </div> */}

        {/* <div className='demo-section'>
          <FaqsFeed
            faqsType={1}
            list={
              [
                {
                  title:"Titulo de la faq?",
                  content:"Contenido de la faq..."
                },
                {
                  title:"Titulo de la faq?",
                  content:"Contenido de la <strong>faq</strong>..."
                }
              ]
            }
          />
        </div> */}

        {/* <div className='demo-section'>
          <TextImageBox
            boxType={1}
            image="footer_cards.png"
            content="Mi contenido <strong>hola mundo</strong> asdf asdf asdf asdfsdf asdfasd fadsfasd."
          />
        </div> */}

        <div className='demo-section'>
          Progress Float
        </div>

        <div className='demo-section'>
          Modales
        </div>
        
      </Container>

      <Footer
        footerType={3}
        footerCardsImg="footer-cards.png"
        secondaryFooterImg="footeCards.png"
        bankFooterImg="bank-footer.png"
        links={
          [
            {
              link: "/terminos-y-condiciones",
              text: "Términos y condiciones"
            },
            {
              link: "/preguntas-frecuentes",
              text: "Preguntas frecuentes"
            }
          ]
        }
        linksText="Válido del XX de xxxxxxxx de xxxx al XX de xxxxxx de xxxx."
        content="<p>Lorem ipsum dolor sit amet consectetur. In iaculis lorem sed et. Nunc ornare neque id amet ultricies tristique pharetra nulla amet. At vitae pellentesque vitae rutrum tempus. Id nisl tortor hac mattis. Lorem ipsum dolor sit amet consectetur. In iaculis lorem sed et. Nunc ornare neque id amet ultricies tristique pharetra nulla amet. At vitae pellentesque vitae rutrum tempus. Id nisl tortor hac mattis.</p><p>Lorem ipsum dolor sit amet consectetur. In iaculis lorem sed et. Nunc ornare neque id amet ultricies tristique pharetra nulla amet. At vitae pellentesque vitae rutrum tempus. Id nisl tortor hac mattis.</p>"
        copyright="© Copyright 2025"
      />
    </div>
  )
}


const mapState = ({ user: {token} }) => {

  return {
    token
  }
}

export default connect(mapState)(DemoComponents)