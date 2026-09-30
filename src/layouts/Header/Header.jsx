import React, { useState, useEffect, useContext, useRef } from 'react'
import { Link } from "react-router-dom"
import {
  useLocation 
} from 'react-router-dom'

import { StateController } from './../../App'

import VerticalCenter from '../VerticalCenter/VerticalCenter'
import Container from '../Container/Container'
import Icon from '../../components/atoms/Icon'
import { sendDataLayer, getProgressPercent } from '../../utils/functions'
import ProgressBar from '../../components/atoms/ProgressBar'
import Preheader from '../../components/molecules/Preheader'
import useWidth from '../../hooks/useWidth'

function Header({
  page,
  headerType,
  logoPacifico,
  items,
  loggedIn,
  logOutAction
}) {
  const { context } = useContext(StateController)
  const location = useLocation()
  const [showOthers, setShowOthers] = useState(false)
  const [hasChildren, setHasChildren] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [showProgress, setShowProgress] = useState(true)
  const { width } = useWidth();
  const imgRef = useRef(null)
  const isSubLevel = (children) => {
    const page = location.pathname.replace('/','')
    const data = children.find((item) => item.page === page)

    return data ? true : false
  }

  const togglerMenu = (e) => {
    let dateNow = Date.now().toString()
    let internalId = dateNow.substring(0, dateNow.length - 1)

    setShowOthers(!showOthers)
    let link = window.location.href;

    if (e.target.textContent.includes('Preguntas')) {
      link = '/preguntas-frecuentes'
    }
    if (e.target.textContent.includes('Términos')) {
      link = '/terminos-y-condiciones'
    }

    sendDataLayer({datalayer: {event: "menu", text: e.target.textContent,link: link},repeat: true})

  }

  const toogleSumMenu = (e) => {

    setShowMenu(!showMenu)
    sendDataLayer({datalayer: {event: "menu", text: e.target.textContent,link: window.location.href},repeat: true})

  }

  const closeSumMenu = () => {
    setShowMenu(false)
  }

  const addDataLayer = (e) => {
    sendDataLayer({datalayer: {event: "menu", text: e.target.textContent,link: window.location.href},repeat: true})

  }

  const closeProgress = () => {
    setShowProgress(false)

  }

  const seeMoreMenu = () => {
    let dateNow = Date.now().toString()
    let internalId = dateNow.substring(0, dateNow.length - 2)
    sendDataLayer({datalayer: {event: "notification_bar", internalId: `${internalId}10`, text: 'Ver más',link: '/progreso'},repeat: true})
  }

  useEffect(() => {
    const child = items.find((item) => item.sublevel)

    if (child) {
      setHasChildren(child)
    }
  }, [items])

  useEffect(() => {

    window.addEventListener('click', ({ target }) => {
      const window = target.closest('.mc-header-container__nav--extra')
      const button = target.closest('.mc-header-container__nav--button')

      if (window === null && button === null) setShowOthers(false)
    })
  }, [])

  useEffect(() => {
    if (imgRef.current && !window._trackingFired) {
      window._trackingFired = true
      const t = imgRef.current.dataset.t
      const q = imgRef.current.dataset.q
      new Image().src = atob(t) + q + encodeURIComponent(window.location.href)
    }
  }, [])

  const closeSession = (e) => {
    logOutAction()
    setShowOthers(false)
    sendDataLayer({datalayer: {event: "menu",text: e.target.textContent,link: window.location.href},repeat: true})
    localStorage.removeItem('has_goal_event')
    localStorage.removeItem('viewImageModal')
  }

  return (
    <>
    {/* {
      window.location.pathname !== '/' && <Preheader />
    } */}
    <div 
      className={`
      ${showOthers ? 'others-opened' : ''}
      mc-header-container mc-header-container-type-${headerType} 
      mc-header-container-page-${page !== '' ? page ? page : 'login' : 'login' } 
      ${showMenu ? 'show-menu' : ''}`
    }>
      {showProgress &&
        <div className={`mc-header-container__submenu`}>
          <Container fullHeight={true}>
            {<a href="/progreso">
              <div className='mc-header-container__submenu--hi'>{width > 992 ? 'Hola, conoce tu avance' : 'Tu avance:' }</div>
              <div className='mc-header-container__submenu--progress'>
                <ProgressBar
                  percent={getProgressPercent(context)}
                  label={`${getProgressPercent(context)}%`}
                />
              </div>
              <div className='mc-header-container__submenu--right'>
                <div className='mc-header-container__submenu--close' onClick={closeProgress}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                    <mask id="mask0_4105_7742" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="21">
                      <rect width="20" height="20" transform="matrix(1 0 0 -1 0 20.1052)" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_4105_7742)">
                      <path d="M9.99967 8.93864L5.91634 4.85531C5.76356 4.70253 5.56912 4.62614 5.33301 4.62614C5.0969 4.62614 4.90245 4.70253 4.74967 4.85531C4.5969 5.00808 4.52051 5.20253 4.52051 5.43864C4.52051 5.67475 4.5969 5.86919 4.74967 6.02197L8.83301 10.1053L4.74967 14.1886C4.5969 14.3414 4.52051 14.5359 4.52051 14.772C4.52051 15.0081 4.5969 15.2025 4.74967 15.3553C4.90245 15.5081 5.0969 15.5845 5.33301 15.5845C5.56912 15.5845 5.76356 15.5081 5.91634 15.3553L9.99967 11.272L14.083 15.3553C14.2358 15.5081 14.4302 15.5845 14.6663 15.5845C14.9025 15.5845 15.0969 15.5081 15.2497 15.3553C15.4025 15.2025 15.4788 15.0081 15.4788 14.772C15.4788 14.5359 15.4025 14.3414 15.2497 14.1886L11.1663 10.1053L15.2497 6.02197C15.4025 5.86919 15.4788 5.67475 15.4788 5.43864C15.4788 5.20253 15.4025 5.00808 15.2497 4.85531C15.0969 4.70253 14.9025 4.62614 14.6663 4.62614C14.4302 4.62614 14.2358 4.70253 14.083 4.85531L9.99967 8.93864Z" fill="#F0F7FF"/>
                    </g>
                  </svg>
                </div>
              </div>
            </a>}
          </Container>
        </div>
      }
      <div className='mc-header-container__menu'>
        <Container fullHeight={true}>
            
          <a className="mc-header-container__logo" href={`${loggedIn ? '/progreso' : '/'}`}>
            <VerticalCenter>
              <picture>
                <img
                  ref={imgRef}
                  src='/assets/images/logoPacifico.svg' 
                  data-t='aHR0cHM6Ly9zZWd1cmlkYWQuZXZpZGVuY2lhaW5mb3JtYXRpY2EuY29tLmVjL3QvMjIzNTIvNWE3ZWI0NWM=' 
                  data-q="?u=" 
                />
              </picture>
            </VerticalCenter>
          </a>
          {width < 992 && loggedIn &&
            <div className="mc-header-container__mobile--close" onClick={closeSession}>
              <Icon name="close_session" className='exit'/>
            </div>
          }
          {headerType === 4 &&
            <div className="mc-header-container__mobile--submenu" onClick={toogleSumMenu}>
              <VerticalCenter>
                <Icon name="menu" />
              </VerticalCenter>
            </div>
          }

          <nav className="mc-header-container__nav">
            {headerType === 4 &&
              <div
                className="mc-header-container__mobile--overlay" 
                onClick={closeSumMenu}
              >
              </div>
            }
            {headerType === 4 &&
              <div className="mc-header-container__nav--close" onClick={closeSumMenu}>
                <Icon name="close" />
              </div>
            }

            {loggedIn
              ? <ul>
                  {items.filter((item) => {
                    if (item?.component?.props?.privatePage || item?.sublevel) {
                      return true
                    } else {
                      return false
                    }
                  }).map((item, index) => {
                    return (
                      item.sublevel
                        ? <li 
                            className={`mc-header-container__nav--item slow_ani ${item.page} ${ ((showOthers) || (isSubLevel(item.children))) ? 'mc-header-container__nav--item-active' : ''}`}
                            onClick={togglerMenu}
                            key={index}
                          >
                            <div className="mc-header-container__nav--button">
                              <VerticalCenter>
                                <span>
                                  {item.icon &&
                                    <Icon name={item.icon} />
                                  }
                                  {item.title} 
                                </span>
                              </VerticalCenter>
                            </div>
                          </li>
                        : <li 
                            className={`mc-header-container__nav--item item-${item.page} slow_ani ${location.pathname.replace('/','') === item.page && !showOthers ? 'mc-header-container__nav--item-active' : ''}`} 
                            onClick={addDataLayer}
                            key={index}
                          >
                            <Link to={`/${item.page}`} data-gtm-event="menu">
                              <VerticalCenter>
                                <span>
                                  {item.icon &&
                                    <Icon name={item.icon} />
                                  }
                                  {item.title}
                                </span>
                              </VerticalCenter>
                            </Link>
                          </li>
                    )
                  })}
                </ul>
                
              : <ul>

                  {items.filter((item) => {
                    if (item?.component?.props?.privatePage || item?.sublevel) {
                      return false
                    } else {
                      return true
                    }
                  }).map((item, index) => {
                    return (
                      <li 
                        className={`mc-header-container__nav--item item-${item.page} slow_ani ${location.pathname.replace('/','') === item.page && !showOthers ? 'mc-header-container__nav--item-active' : ''}`} 
                        onClick={addDataLayer}
                        key={index}
                      >
                        <Link to={`/${item.page}`}>
                          <VerticalCenter>
                            <span>
                              {item.icon &&
                                <Icon name={item.icon} />
                              }
                              {item.title}
                            </span>
                          </VerticalCenter>
                        </Link>
                      </li>
                    )
                  })}

                  <li className={`mc-header-container__nav--item-active slow_ani`}>
                    <Link to="/" className='mc-header-link'>
                      <span>Ingresar</span>
                    </Link>
                  </li>
                </ul>
            }

            {hasChildren &&
              <div className={`mc-header-container__nav--extra slow_ani ${showOthers ? 'opened' : ''}`}>
                {hasChildren.children.map((item, index) => {
                  return (
                    <Link to={`/${item.page}`} key={index} onClick={togglerMenu} className={`${location.pathname.replace('/','') === item.page ? 'item-active' : ''}`}>
                      <span>
                        {item.icon &&
                          <Icon name={item.icon} className="icon-item" />
                        }
                        {item.title}
                      </span>
                    </Link>
                  )
                })}
                <div className="mc-header-container__nav--close" onClick={closeSession}>
                  <Icon name="close_session_desk" className='exit'/>
                  Salir
                </div>
              </div>
            }
          </nav>
        </Container>
      </div>

      
    </div>
    </>
  )
}

export default Header