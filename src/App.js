import React, { useEffect, useState, createContext } from 'react'
import { Route, Routes, useLocation, useSearchParams, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

// pages
import Login from './components/pages/Login'
import Mechanic from './components/pages/Mechanic'
import Progress from './components/pages/Progress'
import Awards from './components/pages/Awards'
import Redemptions from './components/pages/Redemptions'
import Terms from './components/pages/Terms'
import Faqs from './components/pages/Faqs'
import MajorAward from './components/pages/MajorAward'
import Dashboard from './components/pages/Dashboard'
import NotFound from './components/pages/NotFound'
// layout
import Header from './layouts/Header/Header'
import Footer from './layouts/Footer/Footer'
// import Tour from "./components/organisms/Tour"

// components
import CustomModal from './components/molecules/CustomModal'

// actions
import { logOutAction, loginShaAction } from './store/sessionDuck'

import { gtUser, gtStaticContent } from './utils/helpers'
import { getPrice, sendDataLayer, getDateNow } from './utils/functions'
import { doRedeem } from './utils/helpers'
import useWidth from './hooks/useWidth'

import './styles/main.scss'

export const StateController = createContext(null)

function App({ error, token, loggedIn, logOutAction }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { width } = useWidth()
  const [searchParams] = useSearchParams()
  const [modalOpen, setMdalOpen] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [context, setContext] = useState(false)
  const [staticContent, setStaticContent] = useState(false)
  const [autologinPreloader, setAutologinPreloader] = useState(false)
  const [modalEndCampaign, setModalEndCampaign] = useState(false)

  const [awardSelected, setAwardSelected] = useState({})
  const [showConfirm, setShowConfirm] = useState(false)
  const [redemtionLoading, setRedemtionLoading] = useState(false)
  const [showErrorRedemtion, setShowErrorRedemtion] = useState(false)
  const [showSuccessRedemtion, setShowSuccessRedemtion] = useState(false)
  const [pushModal, setPushModal] = useState(true)

  const [base64Pdf, setBase64Pdf] = useState(false)

  const [quantumName, setQuantumName] = useState('')
  const [quantumDoc, setQuantumDoc] = useState('')
  const [department, setDepartment] = useState(false)
  const [city, setCity] = useState(false)
  const [site, setSite] = useState(false)
  const [globalLoader, setGlobalLoader] = useState(false)
  const [showCounter, setShowCounter] = useState(true)
  const [showAceletatorX2, setShowAceletatorX2] = useState(false)


  let home_page = '/progreso'


  const pages =
    width < 992
      ? [
          {
            page: 'mecanica',
            title: 'Cómo ganar',
            icon: 'mechanic',
            sublevel: false,
            component: <Mechanic privatePage />
          },
          {
            page: 'progreso',
            title: 'Meta y progreso',
            icon: 'goals',
            sublevel: false,
            component: <Progress privatePage />
          },
          {
            page: 'premios',
            title: 'Catálogo de bonos',
            icon: 'awards',
            sublevel: false,
            component: <Awards privatePage />
          },
          {
            page: 'mis-redenciones',
            title: 'Bono canjeado',
            icon: 'awardBox',
            sublevel: false,
            component: <Redemptions privatePage />
          },
          {
            page: 'mas',
            title: 'Otros',
            icon: 'others',
            sublevel: true,
            children: [
              {
                page: 'premio-mayor',
                title: 'Premio especial',
                component: <MajorAward privatePage />
              },
              {
                page: 'terminos-y-condiciones',
                title: 'Términos y condiciones',
                component: <Terms />
              },
              { page: 'preguntas-frecuentes', title: 'Preguntas frecuentes', component: <Faqs /> }
            ]
          }
        ]
      : [
          {
            page: 'mecanica',
            title: 'Cómo ganar',
            icon: 'mechanic',
            sublevel: false,
            component: <Mechanic privatePage />
          },
          {
            page: 'progreso',
            title: 'Meta y progreso',
            icon: 'goals',
            sublevel: false,
            component: <Progress privatePage />
          },
          {
            page: 'premios',
            title: 'Catálogo de bonos',
            icon: 'awards',
            sublevel: false,
            component: <Awards privatePage />
          },
          {
            page: 'mis-redenciones',
            title: 'Bono canjeado',
            icon: 'awards',
            sublevel: false,
            component: <Redemptions privatePage />
          },
          {
            page: 'premio-mayor',
            title: 'Premio especial',
            icon: 'awards',
            sublevel: false,
            component: <MajorAward privatePage />
          },

          {
            page: 'mas',
            title: 'Otros',
            icon: 'others',
            sublevel: true,
            children: [
              {
                page: 'terminos-y-condiciones',
                title: 'Términos y condiciones',
                component: <Terms />
              },
              { page: 'preguntas-frecuentes', title: 'Preguntas frecuentes', component: <Faqs /> }
            ]
          }
        ]

  const pathURL = {
    tZNsUTFTPw: 'progreso',
    WtwuqKUmjp: 'mecanica',
    JnXnducsYR: 'premios',
    LhknwuCB8R: 'mis-redenciones',
    MsFaj6v12C: 'premio-mayor',
    pMLl7K7NL40: 'terminos-y-condiciones',
    dW01D9ysQJ7: 'preguntas-frecuentes'
  }

  const closeLoginModal = () => {
    setAutologinPreloader(false)
    setNotFound(false)
    localStorage.removeItem('userNotFound')
    window.location.href = '/'
  }

  useEffect(() => {
    if (localStorage.getItem('userNotFound')) {
      sendDataLayer({ datalayer: { event: 'error_login_code' }, repeat: true })
      setNotFound(true)

      setTimeout(() => {
        localStorage.removeItem('userNotFound')
      }, 3000)
    } else {
      setNotFound(false)
    }

    gtStaticContent().then((content) => {
      if (content && content.content) setStaticContent(content.content)
    })
  }, [])

  useEffect(() => {
    if (searchParams.get('utm_web')) {
      setAutologinPreloader(true)
      setGlobalLoader(true)
    }

    if (!localStorage.getItem('storage')) {
      if (window.location.search !== '') {
        console.log('Navegate to:', window.location.search)
        // navigate(window.location.search)
      } else {
        const public_url = pages.find((page) => page.page === location.pathname.replace('/', ''))
        const public_children_urls = pages.find((page) => page.sublevel)

        if (public_url) {
          if (!loggedIn && public_url?.component?.props?.privatePage) document.location.href = '/'
        } else if (public_children_urls) {
          const public_child_url = public_children_urls?.children.find(
            (childPage) => childPage.page === location.pathname.replace('/', '')
          )
          if (public_child_url?.component?.props?.privatePage) navigate('/')
        }
      }
    }
  }, [searchParams, error])

  useEffect(() => {
    const isModalViewed = localStorage.getItem('viewImageModal')
    if (!isModalViewed)  setShowAceletatorX2(false)
  }, [context.user])

  useEffect(() => {
    if (token !== '') {
      gtUser(token)
        .then((user) => {
          if (user?.data) {
            setContext(user.data)
            if (searchParams.get('pathurl')) {
              const path = pathURL[searchParams.get('pathurl')] || home_page
              let queryparams = ''

              for (const x of searchParams.keys()) {
                if (!(x === 'utm_web' || x === 'pathurl')) {
                  queryparams += `${x}=${searchParams.get(x)}&`
                }
              }
              queryparams = queryparams.slice(0, queryparams.length - 1)
              console.log(path, queryparams)
              window.location.href = `${path}${queryparams && queryparams !== '' && '?'}${queryparams}`
            } else if (window.location.pathname !== home_page && window.location.pathname === '/') {
              if (
                user?.data &&
                user?.data?.firstTime
              ) {
                home_page = '/mecanica';
                window.location.href = home_page;
              } else {
                window.location.href = home_page
              }
            }
            if (user?.data?.tracing && user?.data?.tracing[`winner_${user.data.block}`] === 1) {
              if (!localStorage.getItem('has_goal_event')) {
                sendDataLayer({ datalayer: { event: 'goal', winner_1: 1 }, repeat: false })
                localStorage.setItem('has_goal_event', 'true')
              }
            }
          } else if (
            user.statusCode === 301 &&
            localStorage.getItem('storage') &&
            window.location.pathname === '/'
          ) {
            localStorage.removeItem('storage')
            window.location.reload()
          }
          if (
            user?.statusCode === 301 &&
            window.location.pathname !== '/' &&
            window.location.pathname !== '/dashboard'
          ) {
            window.location.href = '/'
          }
        })
        .catch(() => navigate('/'))
    }
  }, [token])

  const handlerModal = () => {
    if (showConfirm) {
      sendDataLayer({
        datalayer: {
          event: 'cancel_bond',
          product_name: awardSelected?.name,
          product_price: awardSelected?.price,
          index: awardSelected?.index
        },
        repeat: true
      })
    }
    setShowConfirm(!showConfirm)
  }

  const handlerRedemtion = async () => {
    setRedemtionLoading(true)

    if (awardSelected.canRedem) {
      doRedeem(
        token,
        awardSelected.price,
        awardSelected.id,
        quantumName,
        quantumDoc,
        site?.selected
      )
        .then((data) => {
          setRedemtionLoading(false)
          setShowConfirm(false)
          if (data && data.status === 200 && data.file) {
            // setShowSuccessRedemtion(true)
            setBase64Pdf(data.base64)

            const now = new Date()
            console.log(now.toISOString())

            sendDataLayer({
              datalayer: {
                event: 'redeem_bond',
                product_name: awardSelected?.name,
                product_price: awardSelected?.price,
                time: now.toISOString()
              },
              repeat: false
            })

            const pdfBlob = fetch(data.base64).then((res) => res.blob())
            pdfBlob.then((blob) => {
              const pdfUrl = URL.createObjectURL(blob)
              window.open(pdfUrl, '_blank')

              setTimeout(() => URL.revokeObjectURL(pdfUrl), 10000)
            })

            console.log('Mostrar el modal de previsualizacion!', data)

            setTimeout(() => {
              window.location.href = '/mis-redenciones'
            }, 5000)
          } else {
            console.log('Error en redencion')
            sendDataLayer({
              datalayer: {
                event: 'exhausted_bond',
                product_name: awardSelected?.name,
                product_price: awardSelected?.price,
                index: awardSelected?.index
              },
              repeat: true
            })
            setShowErrorRedemtion(true)
          }
        })
        .catch((error) => {
          console.log('ERROR ON REDENTION:', error)
        })
    }
  }

  const redirectProgress = () => {
    localStorage.setItem('viewImageModal', 'true')
    window.location.href = '/progreso'
  }

  return (
    <StateController.Provider
      value={{
        setMdalOpen: setMdalOpen,
        context: context,
        staticContent: staticContent,
        pages: pages,
        awardSelected: awardSelected,
        setAwardSelected: setAwardSelected,
        handlerRootModal: handlerModal
      }}
    >
      {/* {context && context.firstTime && !localStorage.getItem('tourViewed') && <Tour />} */}

      <CustomModal
        title="Algo no coincide"
        desc="Por favor, revisa tu código e inténtalo de nuevo."
        cta="Aceptar"
        icon={false}
        primaryAction={{
          action: closeLoginModal,
          buttonText: 'Aceptar',
          loading: false
        }}
        show={notFound}
        setShowModal={setNotFound}
        error={true}
      />

      {getDateNow() >= '2024-11-30' && window.location.pathname === '/' && (
        <CustomModal
          global
          title="¡Gracias por participar!"
          desc='<strong>La campaña "Más la usas, más ganas" ha llegado a su fin.<br /> <br /> </strong> Si eres uno de los ganadores y aún hay bonos disponibles, recuerda canjearlo antes del 6 de Diciembre de 2024. <p>¡Sigue usando tu Tarjeta Débito Mastercard PacifiCard para todo y aprovecha sus beneficios!</p>'
          cta="Aceptar"
          icon={false}
          show={modalEndCampaign}
          setShowModal={setModalEndCampaign}
          noButton
        />
      )}

      {showAceletatorX2 && (
        <CustomModal
          push
          title={`¡Estás a un paso de <br/> participar y ganar!`}
          desc='Revisa el correo que te enviamos<br/>desde Banco Pacífico para acceder<br/>a la promoción.<br/><br/>¿Recibiste un código por<br/>WhatsApp? Ingrésalo para<br/>completar tu registro.'
          cta="Quiero participar"
          class_name="aceletatorX2"
          primaryAction={{
            buttonText: 'Quiero participar',
            loading: false,
            //icon: "Redenciones.png"
          }}
          icon={false}
          show={showAceletatorX2}
          setShowModal={setShowAceletatorX2}
        />
      )}

      {showSuccessRedemtion && (
        <CustomModal
          title="¡Lo lograste! <br /> Canjeaste tu bono"
          desc="¡Ganas al ser el cliente que más veces cumple su meta o al acumular la mayor facturación al final de la campaña!"
          cta="Aceptar"
          icon={false}
          push
          context={context}
          image="img_push_modal.png"
          goTo={'/premio-mayor'}
          primaryAction={{
            action: setPushModal,
            buttonText: 'Quiero más premios',
            loading: false
          }}
          show={pushModal}
          setShowModal={setPushModal}
        />
      )}

      <CustomModal
        show={showConfirm}
        setShowModal={setShowConfirm}
        redemtion={true}
        image={awardSelected.image}
        title={`US$ ${getPrice(awardSelected.price).replace('.', '')}`}
        desc={awardSelected.name}
        twoStepAuth={awardSelected.twoStepAuth}
        location={awardSelected?.location}
        brand_id={awardSelected?.brand_id}
        quantumName={quantumName}
        quantumDoc={quantumDoc}
        setQuantumName={setQuantumName}
        setQuantumDoc={setQuantumDoc}
        department={department}
        city={city}
        site={site}
        setDepartment={setDepartment}
        setCity={setCity}
        setSite={setSite}
        token={token}
        awardSelected={awardSelected}
        description={awardSelected.description}
        link={awardSelected.link}
        primaryAction={{
          action: handlerRedemtion,
          buttonText: 'Descargar bono',
          loading: redemtionLoading
        }}
        terms={{
          termsText: 'Términos y condiciones',
          termsLink: '/terminos-y-condiciones'
        }}
      />
      <CustomModal
        title=""
        desc={'Ocurrió un error al obtener tu bono. Intentalo de nuevo más tarde.'}
        cta="Aceptar"
        error={true}
        reloadOnClose={true}
        show={showErrorRedemtion}
        setShowModal={setShowErrorRedemtion}
      />
      <CustomModal
        title="¡Tu bono se ha canjeado!"
        desc={`Busca tu bono en Documento (IOS) o en Archivos (ANDROID).`}
        cta="Cerrar"
        image="image.png"
        postRedemtion={true}
        base64Pdf={base64Pdf}
        show={showSuccessRedemtion}
        setShowModal={setShowSuccessRedemtion}
      />

      {/* {
        (
          location.pathname === '/' ||
          location.pathname === '/progreso' ||
          location.pathname === '/premios'
        ) && showCounter &&
          <CounterDown
            showDays
            showHours
            showMins
            showSegs
            location={location.pathname === '/' ? 'top' : 'bottom'}
            setShowCounter={setShowCounter}
          />
      } */}

      <div
        className={`App ${modalOpen ? 'modalOpen' : ''} ${loggedIn ? 'loggedIn' : 'noLoggedIn'} ${globalLoader ? 'global-loading' : ''} `}
      >
        <Header
          headerType={1}
          logo="logoPacifico.png"
          items={pages}
          submenu={{
            type: 'nickname',
            default: 'A'
          }}
          page={location.pathname.replace('/', '')}
          notifications={[
            {
              id: 1,
              title: 'Notification',
              content: 'html content',
              status: 0
            }
          ]}
          loggedIn={loggedIn}
          logOutAction={logOutAction}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Login
                autologin={autologinPreloader}
                hash={searchParams.get('utm_web')}
                setGlobalLoader={setGlobalLoader}
              />
            }
          />

          {/* Root pages */}
          {pages.map((page, i) => {
            return <Route key={i} path={`/${page.page}`} element={page.component} />
          })}

          {/* Child pages */}
          {pages
            .find((page) => {
              return page.sublevel ? true : false
            })
            ?.children.map((page, i) => {
              return <Route key={i} path={`/${page.page}`} element={page.component} />
            })}
          <Route path="/dashboard" element={<Dashboard adminPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer
          footerType={1}
          footerCardsImg="footer-cards.png"
          secondaryFooterImg="footer-cards.png"
          bankFooterImg="bank-footer.png"
          links={[
            {
              link: '/terminos-y-condiciones',
              text: 'Términos y condiciones'
            },
            {
              link: '/preguntas-frecuentes',
              text: 'Preguntas frecuentes'
            }
          ]}
          linksText="<p>Válido del 8 de octubre al 2 de diciembre de 2026.<br/> *Aplica para compras dentro y fuera del territorio ecuatoriano de manera presencial o por medios digitales.</p><p>**Esta es una campaña oficial de Banco del Pacífico.</p>"
          content=""
          copyright="© Copyright 2026. Todos los derechos reservados"
        />
      </div>
    </StateController.Provider>
  )
}

const mapState = ({ user: { fetching, loggedIn, token, error } }) => {
  return {
    fetching,
    loggedIn,
    token,
    error
  }
}

export default connect(mapState, { logOutAction, loginShaAction })(App)
