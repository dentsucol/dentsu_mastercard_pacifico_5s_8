import React, { useContext, useEffect } from 'react'
import { StateController } from './../../App'

import Container from '../../layouts/Container/Container'
import ProgressBar from '../atoms/ProgressBar'
import GoalCounter from '../atoms/GoalCounter'
import Tabs from '../organisms/Tabs'
import { getProgressPercent, getPrice, getDateNow } from '../../utils/functions'
import TestQuestions from '../organisms/TestQuestions'
import { sendDataLayer } from '../../utils/functions'
import MicroBanner from '../molecules/MicroBanner'
import InfoCatalog from '../atoms/InfoCatalog'
import useWidth from '../../hooks/useWidth'
import FaqsFeed from '../organisms/FaqsFeed'
import Icon from '../atoms/Icon'
import BannerRedeemed from '../molecules/BannerRedeemed'

function Progress() {
  const { context } = useContext(StateController)
  const { width } = useWidth()

  const restTrx =
    context && context.tracing && context.user && context.tracing?.categories !== null
      ? context.user[`goal_category_1`] - context.tracing?.categories?.split(',').length
      : context?.user?.[`goal_category_1`]

  const sendDataWinner = (textElement) => {
    sendDataLayer({
      datalayer: { event: 'progress', text: textElement, link: '/premios' },
      repeat: true
    })
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  const faqs_progress = [
    {
      id: 1,
      title: '¿En qué consiste la meta personal?',
      content: `Es un reto asignado por cada tarjeta, definido por Mastercard y Banco del Pacífico S.A. con base en el 
                comportamiento transaccional previo. Incluye dos condiciones: alcanzar un monto de facturación y comprar 
                en una cantidad mínima de categorías de comercios. Para ser ganador, es necesario cumplir ambas 
                condiciones. Cada participante podrá consultar su meta y progreso a través de la plataforma de campaña: 
                www.pacificoestaentodas.bancodelpacifico.com.`
    },
    {
      id: 2,
      title: '¿Cuáles son las condiciones para ganar un bono?',
      content: `Durante la vigencia de la campaña:
      <ul>
        <li>Recibir y abrir al menos un mail, SMS o WhatsApp de campaña.</li>
        <li>Ingresar desde la comunicación enviada a la página web: <a href='https://www.pacificoestaentodas.bancodelpacifico.com' target='_blank'>www.pacificoestaentodas.bancodelpacifico.com</a>.</li>
        <li>Cumplir la meta personal de facturación y de categorías de establecimientos.</li>
      </ul>`
    },
    {
      id: 3,
      title: '¿Qué tarjetas participan en la Campaña?',
      content: `Participan las Tarjetas personales Mastercard Débito del Pacífico cuyo titular haya sido invitado a la campaña. No participan tarjetas empresariales, ni tarjetas bloqueadas, inactivas o canceladas durante la vigencia de la campaña.`
    }
  ]

  const Goal = () => {
    return (
      <>
        {/* Sección Dos Metas */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ width: '335px' }}>
            {/* Primera Meta: Facturación */}
            <div className="mc-goal-card">
              <div className="mc-goal-card__header">
                <h3>Meta de facturación</h3>
              </div>
              <div className="mc-goal-card__body">
                <div className="mc-goal-card__amount">
                  US{getPrice(context ? context.user[`goal_amount_1`] : 0)}
                </div>
                <p className="mc-goal-card__label">Así va tu progreso</p>
                <div className="mc-goal-card__progress">
                  <p>Llevas: US{getPrice(context && context.tracing ? context.tracing[`amount_1`] : 0)}</p>
                  <div className="mc-tabs-container--content__body--progress">
                    <ProgressBar
                      percent={getProgressPercent(context)}
                      label={`${getProgressPercent(context)}%`}
                    />
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div style={{ width: '340px' }}>
            {/* Segunda Meta: Categorías */}
            <div className="mc-goal-card">
              <div className="mc-goal-card__header">
                <h3>Meta de categorías</h3>
              </div>
              <div className="mc-goal-card__body mc-goal-card__body--second">
                <p className="mc-goal-card__description">Compra en diferentes categorías para completar tu meta.</p>
                <div className="mc-goal-card__categories">
                  <p>
                    <strong>Llevas</strong> <span className="highlight">{context && context.tracing && context.tracing.categories ? context.tracing.categories.split(',').length : 0}</span> <strong>categorías de</strong> <span className="highlight">{context && context.user ? context.user[`goal_category_1`] : 0}</span>
                  </p>
                </div>
                <a href="#categories-goal">
                  <button className="mc-goal-card__btn">Conocer categorías<Icon name="arrow_white_down"/></button>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="major-award-page" style={{ marginTop: '30px' }}>
          <InfoCatalog
            dateText={context && context.tracing ? context.tracing.date_update : '19/05/2026'}
            type={1}
          />
        </div>

        {/* Sección: Elige dónde comprar */}
        {context && (
          <div className="mc-tabs-container--content__body--cats">
            {/* <p>
              <span>Sigue comprando en mínimo {context.user[`goal_category_1`]} comercios para llegar a la meta.</span><br />
              Te faltan {restTrx < 0 ? 0 : restTrx} de {context.user[`goal_category_1`]}.
            </p> */}

            {/* <div className='mc-tabs-container--content__body--section'>
              <span className='section-number section-number2'>2.</span>
              <div className='categories-goal-text'>
                <p>
                  <strong>
                    Sigue comprando en mínimo {(context && context.user) ? context.user[`goal_category_1`] : 0} categorías para
                    <span className="desktop-break"><br /></span>
                    llegar a la meta.
                  </strong>
                  <span className='goal-progress'>Te faltan {restTrx < 0 ? 0 : restTrx} de {(context && context.user) ? context.user[`goal_category_1`] : 0}</span>
                </p>
              </div>
            </div> */}
            <>
                <div id="categories-goal" className="mc-goal-section">
                  <h2 className="mc-goal-section__title">
                    {context && context.tracing && context.tracing.winner_1 == 1
                      ? 'Categorías completadas'
                      : 'Compra en cualquiera de estas categorías'}
                  </h2>
                  <div className="categories-goal-text">
                    <p>
                      {/*context && context.tracing && context.tracing.winner_1 == 1 ? (
                        <span className="goal-progress mc-goal-section__progress">
                          Cumpliste las compras en las categorías necesarias para alcanzar tu meta.
                        </span>
                      ) : (
                        <span className="goal-progress mc-goal-section__progress">
                          Compra en {context && context.user ? context.user[`goal_category_1`] : 0}{' '}
                          categorías distintas para cumplir tu meta. <strong>Aún te faltan{' '}
                            {isNaN(restTrx) || restTrx < 0 ? 0 : restTrx}.</strong>
                        </span>
                      )*/}
                    </p>
                  </div>
                </div>

                <div className="mc-tabs-container--content__body--cats__items">
                  {context.cats.map((cat, index) => {
                    let idCat = cat.id
                    return (
                      <div
                        key={index}
                        className={`mc-tabs-container--content__body--cats__items--item ${context.tracing?.categories &&
                            context.tracing.categories.split(',').some((cat) => Number(cat) === idCat)
                            ? 'active'
                            : ''
                          }`}
                      >
                        <div>
                          {context?.tracing &&
                            context?.tracing?.categories &&
                            context?.tracing?.categories
                              ?.split(',')
                              .some((cat) => cat == idCat) && (
                              <img src="/assets/images/tick.png" alt="completado" />
                            )}
                          <div dangerouslySetInnerHTML={{ __html: cat.image }} />
                        </div>
                        <span>{cat.name}</span>
                      </div>
                    )
                  })}
                </div>
                <div className="shadow-bottom"></div>

                {context && (
                  <div className="first-progress-content">
                    <div className="mc-section-card--copy">
                      {context.tracing && context.tracing.winner_1 == 1 ? (
                        <strong>¡Ya cumpliste tu meta!</strong>
                      ): (
                        <strong>Una vez que cumplas tu meta podrás canjear tu premio</strong>
                      )}
                    </div>
                    <a href="/premios" onClick={sendDataWinner("Consulta el catálogo de bonos")}>Consulta el catálogo de bonos</a>
                  </div>
                )}
            </>
          </div>
        )}
      </>
    )
  }

  const Records = () => {
    return (
      <>
        <div className="records-trophy-section">
          {width > 992 ? (
            <p>
              Entre más veces cumplas tu meta de facturación, más 
              <br /> te acercas al premio especial. 
            </p>
          ) : (
            <>
              <p>
                Entre más veces cumplas tu meta de facturación, más te acercas al premio especial.
              </p>
            </>
          )}

          <img src="/assets/images/awardIcon.png" alt="icono trofeo" />
          <GoalCounter label={`Has cumplido tu meta`} rule={'complete'} />
        </div>

        <div className="mc-section-card--last last-banner-item">
          Las compras realizadas hasta el <br />
          <strong>
            {context && context.tracing ? context.tracing.date_update : '06/11/2025'}
          </strong>{' '}
          se ven reflejadas en tu progreso.
        </div>

        <div className="mc-section-card--cta">
          <a href="/terminos-y-condiciones" onClick={ctaDatalayer} className="simple-anchor">
            *Aplican términos y condiciones.
          </a>
          <a href="/premio-mayor" onClick={ctaDatalayer2}>
            Descubre el premio especial
          </a>
        </div>

        {/* <div className='mc-section-card--last last-banner-item'>
          Las compras realizadas hasta el <br /><strong>{(context && context.tracing && context.tracing.date_update) ? context.tracing.date_update : 'XX/XX/XXXX'}</strong> se ven reflejadas en tu progreso.
        </div> */}
      </>
    )
  }

  const ctaDatalayer = () => {
    sendDataLayer({
      datalayer: {
        event: 'progress',
        text: '*Aplica términos y condiciones.',
        link: '/terminos-y-condiciones'
      },
      repeat: true
    })
  }

  const ctaDatalayer2 = () => {
    sendDataLayer({
      datalayer: { event: 'progress', text: 'Descubre el premio especial', link: '/premio-mayor' },
      repeat: true
    })
  }

  return (
    <div className="mc-page progress inner slow_ani">
      {context?.tracing &&
        context?.tracing?.extra === '1' &&
        getDateNow() >= '2024-10-10' &&
        getDateNow() <= '2024-10-13' && (
          <Container>
            <MicroBanner />
          </Container>
        )}

      <Container>
        <h1 style={{ fontWeight: 700 }}>
          {context && context.tracing && context.tracing.winner_1 == 1 ?
            <><span>¡Felicidades, cumpliste tu meta!</span></> :
            <>Para ganar tu bono <span>debes cumplir 2 metas</span></>
          }
        </h1>

        {context && context.tracing && context.tracing.winner_1 == 1 && (
          <BannerRedeemed type={context.redemtions.length > 0 ? "redeemed" : 'winner'} />
        )}

        {/*<div className='progress-minibanner'>
          <div className='progress-minibanner__title'>
            <img src="assets/images/disclaimer2.svg"></img>
            <h3>La campaña finalizó</h3>
          </div>
          <p>
          Gracias por participar. ¡Nos vemos en la próxima!
          </p>
        </div>*/}

        <div className="mc-section-card">
          <Tabs
            sections={[
              {
                icon: 'flag',
                title: 'Meta y progreso',
                content: <Goal />
              },
              {
                icon: 'trophy',
                title: 'Tus metas cumplidas',
                content: <Records />
              }
            ]}
          />
        </div>

        <div className="mc-section-faqs-progress">
          <h2>¿Tienes dudas sobre tu progreso?</h2>
          <FaqsFeed faqsType={1} list={faqs_progress} />
        </div>

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
            quizNumber={1}
            title="¿Este contenido te ayudó a entender la dinámica de la campaña?"
            from={'progress'}
          />
        </div>
      </Container>
    </div>
  )
}
export default Progress
