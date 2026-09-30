import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { StateController } from './../../App'

import VerticalCenter from '../../layouts/VerticalCenter/VerticalCenter'
import Input from '../atoms/Input'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'
import { sendDataLayer } from '../../utils/functions'
import { getAwardTermsPdf } from '../../utils/termsByAward'

function CustomModal({
  token,
  show,
  setShowModal,
  primaryAction,
  secondaryAction,
  terms,
  image,
  title,
  desc,
  cta,
  twoStepAuth,
  location,
  brand_id,
  quantumName,
  setQuantumName,
  quantumDoc,
  setQuantumDoc,
  department,
  city,
  site,
  setDepartment,
  setCity,
  setSite,
  redemtion,
  postRedemtion,
  base64Pdf,
  awardSelected,
  error,
  description,
  link,
  reloadOnClose,
  push,
  context,
  goTo,
  modalSuperPower,
  subDescription,
  isSupermarket,
  global,
  noButton,
  class_name
}) {
  const { setMdalOpen } = useContext(StateController)
  const [twoStepAuthStatus, setTwoStepAuthStatus] = useState(false)
  const [expDate, setExpDate] = useState('')
  const [primaryActionStatus, setPrimaryActionStatus] = useState('inactive')
  const [showTerms, setShowTerms] = useState(false)
  const [secondStatus, setSecondStatus] = useState(false)
  const termsPdfUrl = getAwardTermsPdf(awardSelected)

  const [errors, setErrors] = useState({
    expDate: false
  })

  const abrirPDF = (e) => {
    e.preventDefault()
    sendDataLayer({
      datalayer: {
        event: 'bond_tyc',
        product_name: awardSelected?.name,
        product_price: awardSelected?.price
      },
      repeat: true
    })
    window.open(termsPdfUrl, '_blank', 'noopener,noreferrer')
  }

  const termsToggler = async () => {
    setShowTerms(!showTerms)
    sendDataLayer({
      datalayer: {
        event: 'bond_tyc',
        product_name: awardSelected?.name,
        product_price: awardSelected?.price
      },
      repeat: true
    })
  }

  useEffect(() => {
    setMdalOpen(show ? true : false)
  }, [show])

  const close = () => {
    console.log('CLose!')
    localStorage.setItem('viewImageModal', 'true')

    if (redemtion) {
      sendDataLayer({
        datalayer: {
          event: 'cancel_bond',
          product_name: awardSelected?.name,
          product_price: awardSelected?.price
        },
        repeat: true
      })
    }
    setShowModal(false)
    if (reloadOnClose) {
      window.location.reload
    }
  }

  const handleChange = async (e) => {
    const element = e.target.getAttribute('rel')

    if (element === 'birthdate') {
      setExpDate(e.target.value)
      setErrors({ ...errors, expDate: false })

      setTwoStepAuthStatus(true)
    }
  }

  useEffect(() => {
    if (
      (twoStepAuth && twoStepAuthStatus) ||
      (location && location === 1 && quantumName !== '' && quantumDoc !== '') ||
      (location && location === 2 && site?.selected)
    ) {
      setPrimaryActionStatus('active')
    } else {
      setPrimaryActionStatus('inactive')
    }

    if (
      (!twoStepAuth && location === 0) ||
      (!twoStepAuth && location === 5) ||
      (!twoStepAuth && location === 6) ||
      (!twoStepAuth && location === 7)
    )
      setPrimaryActionStatus('active')
  }, [twoStepAuth, location, quantumName, quantumDoc, site])

  const changeStatus = () => {
    setSecondStatus(!secondStatus)
  }

  return (
    <div
      className={`mc-custom-modal ${show && 'mc-custom-modal__opened'} ${class_name && class_name} slow_ani ${redemtion ? 'is-redemtion' : ''} ${postRedemtion ? 'is-post-redemtion' : ''} ${push ? 'pushModal' : ''} ${isSupermarket ? 'isSupermarket' : ''} ${global ? 'global' : ''}`}
    >
      <div className="mc-custom-modal__overlay slow_ani" onClick={close}></div>
      <div className="mc-custom-modal__center">
        <VerticalCenter>
          {push ? (
            <>
              <div className="mc-custom-modal__center--window slow_ani">
                <div className="mc-custom-modal__close" onClick={close}>
                  <Icon name="close" />
                </div>

                {image && (
                  <div
                    className="mc-custom-modal__center--window__image"
                    style={{ backgroundImage: `url(/assets/images/${image})` }}
                  ></div>
                )}

                <div
                  dangerouslySetInnerHTML={{ __html: title }}
                  className={`mc-custom-modal__center--window__title`}
                ></div>

                {subDescription && !isSupermarket && (
                  <div className="specialAward">
                    {
                      <>
                        Ahora, participa por un: <br />{' '}
                        <strong>
                          {context?.user?.segment === 'Grupo 1' ? (
                            'Un bono de US$ 500 o un Apple Watch S11 o un Galaxy Watch 8 Classic.'
                          ) : context?.user?.segment === 'Grupo 2' ? (
                            'Un bono de Amazon por US$ 1,000 o un Iphone 16 256 gb o un Samsumg  S25 Plus 256 gb'
                          ) : context?.user?.segment === 'Grupo 3' ? (
                            'Un bono de Amazon por $1,500 US$ o un TV Samsung 75” Crystal UHD 4k.'
                          ) : context?.user?.segment === 'Grupo 4' ? (
                            'Un bono de Amazon por $2,000 US$ o un iPhone 16 256 gb + Apple Watch o una de las dos Experiencias Priceless en Galápagos o en Cuenca.'
                          ) : (
                            <></>
                          )}
                        </strong>
                      </>
                    }
                  </div>
                )}

                <div className="mc-custom-modal__center--window__desc">
                  <div dangerouslySetInnerHTML={{ __html: desc }} />
                </div>

                {isSupermarket && (
                  <p className="extra-text-modal">
                    <strong>*Revisa tu correo electrónico</strong> para conocer el monto mínimo de
                    tu compra y el monto del bono que puedes ganar. Válido hasta el 30 de noviembre
                    o hasta agotar el stock de los 500 bonos de Hipermarket para este reto.
                  </p>
                )}

                {redemtion ? (
                  secondStatus ? (
                    <div className="mc-custom-modal__center--window__actions extra-modal">
                      <Button
                        type="primary"
                        text={'Descargar'}
                        loading={primaryAction ? primaryAction.loading : false}
                        status={postRedemtion || error || base64Pdf ? true : primaryActionStatus}
                        onClick={
                          error || base64Pdf ? close : primaryAction ? primaryAction.action : close
                        }
                        redirect={base64Pdf ? '/mis-redenciones' : false}
                      />
                      <Button
                        type="secondary"
                        text={'Cancelar'}
                        loading={false}
                        status="active"
                        onClick={changeStatus}
                        redirect={base64Pdf ? '/mis-redenciones' : false}
                      />
                    </div>
                  ) : (
                    <div className="mc-custom-modal__center--window__actions">
                      <Button
                        type="primary"
                        text={primaryAction ? primaryAction.buttonText : cta}
                        loading={primaryAction ? primaryAction.loading : false}
                        status={true}
                        onClick={changeStatus}
                        redirect={base64Pdf ? '/mis-redenciones' : false}
                      />
                      {secondaryAction && (
                        <Button
                          type="secondary"
                          text={secondaryAction.buttonText}
                          loading={false}
                          status="active"
                          onClick={secondaryAction.action}
                          redirect={base64Pdf ? '/mis-redenciones' : false}
                        />
                      )}
                    </div>
                  )
                ) : (
                  <div className="mc-custom-modal__center--window__actions">
                    <Button
                      type="primary"
                      text={primaryAction ? primaryAction.buttonText : cta}
                      loading={primaryAction ? primaryAction.loading : false}
                      status={'active'}
                      onClick={
                        error || base64Pdf ? close : primaryAction ? primaryAction.action : close
                      }
                      redirect={goTo && goTo}
                      awardIcon={primaryAction.icon ? primaryAction.icon : ''}
                      className="pushModalBTN"
                    />
                    {secondaryAction && (
                      <Button
                        type="secondary"
                        text={secondaryAction.buttonText}
                        loading={false}
                        status="active"
                        onClick={secondaryAction.action}
                        redirect={base64Pdf ? '/mis-redenciones' : false}
                      />
                    )}
                  </div>
                )}

                {terms && !secondStatus && (
                  <div className="mc-custom-modal__center--window__terms">
                    <Link to={terms.termsLink} target="_blank" rel="noreferrer">
                      {terms.termsText}
                    </Link>
                  </div>
                )}

                {redemtion && !secondStatus && (
                  <div className="mc-custom-modal__center--window__extra">
                    {/* <div>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.87183 9.05135C4.87183 8.41891 5.12306 7.81238 5.57026 7.36518C6.01746 6.91798 6.62399 6.66675 7.25643 6.66675H11.6505C13.1734 6.66675 14.4484 7.557 15.3243 8.54899C15.9761 9.28663 16.763 9.84622 17.5897 9.84622H24.7435C25.3759 9.84622 25.9825 10.0975 26.4297 10.5447C26.8769 10.9918 27.1281 11.5984 27.1281 12.2308V13.2482C28.0343 13.6695 28.6225 14.6409 28.4889 15.706L27.4715 23.8518C27.3513 24.8136 26.8837 25.6984 26.1567 26.3396C25.4298 26.9808 24.4935 27.3342 23.5242 27.3333H8.47417C7.50537 27.3334 6.5699 26.9797 5.84359 26.3385C5.11729 25.6974 4.65016 24.8131 4.53003 23.8518L3.5126 15.706C3.44993 15.2052 3.54775 14.6974 3.792 14.2558C4.03625 13.8141 4.41433 13.4614 4.87183 13.2482V9.05135ZM6.46156 13.0257H25.5384V12.2308C25.5384 12.02 25.4546 11.8178 25.3056 11.6688C25.1565 11.5197 24.9543 11.436 24.7435 11.436H17.5897C16.0572 11.436 14.8713 10.436 14.1336 9.6014C13.4151 8.78745 12.5343 8.25648 11.6505 8.25648H7.25643C7.04562 8.25648 6.84344 8.34023 6.69437 8.48929C6.54531 8.63836 6.46156 8.84054 6.46156 9.05135V13.0257ZM5.87813 14.6154C5.76544 14.6155 5.65405 14.6394 5.55134 14.6858C5.44864 14.7322 5.35696 14.7998 5.28239 14.8843C5.20783 14.9688 5.15208 15.0682 5.11884 15.1759C5.08561 15.2835 5.07565 15.397 5.08962 15.5089L6.10705 23.6547C6.17914 24.2315 6.45951 24.7622 6.89543 25.1469C7.33134 25.5316 7.89278 25.7438 8.47417 25.7436H23.5258C24.1072 25.7438 24.6686 25.5316 25.1045 25.1469C25.5404 24.7622 25.8208 24.2315 25.8929 23.6547L26.9103 15.5089C26.9243 15.397 26.9143 15.2835 26.8811 15.1759C26.8479 15.0682 26.7921 14.9688 26.7175 14.8843C26.643 14.7998 26.5513 14.7322 26.4486 14.6858C26.3459 14.6394 26.2345 14.6155 26.1218 14.6154H5.87813Z" fill="#005EB8"/>
                </svg>
                  Encuentra tu bono en la carpeta de Documentos en iOS o en Archivos en Android.
                </div> */}
                    <div>
                      Recuerda, puedes desca-rgar tu bono las veces que quieras en la sección “Bonos
                      canjeado”
                    </div>
                    <p>
                      El bono está sujeto a los{' '}
                      <a onClick={abrirPDF} href={termsPdfUrl}>
                        términos y condiciones
                      </a>{' '}
                      del comercio aliado.
                    </p>
                    {/* <div className={`anchor ${showTerms ? 'active' : ''}`} onClick={termsToggler}>
                        Conócelos aquí

                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <mask id="mask0_4421_11560" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                            <rect y="16" width="16" height="16" transform="rotate(-90 0 16)" fill="#D9D9D9" />
                          </mask>
                          <g mask="url(#mask0_4421_11560)">
                            <path d="M7.99984 6.35001L3.09984 11.25C2.93317 11.4167 2.73595 11.4972 2.50817 11.4917C2.28039 11.4861 2.08317 11.4 1.9165 11.2333C1.74984 11.0667 1.6665 10.8695 1.6665 10.6417C1.6665 10.4139 1.74984 10.2167 1.9165 10.05L7.04984 4.93334C7.18317 4.80001 7.33317 4.70001 7.49984 4.63334C7.6665 4.56668 7.83317 4.53334 7.99984 4.53334C8.1665 4.53334 8.33317 4.56668 8.49984 4.63334C8.6665 4.70001 8.8165 4.80001 8.94984 4.93334L14.0832 10.0667C14.2498 10.2333 14.3304 10.4278 14.3248 10.65C14.3193 10.8722 14.2332 11.0667 14.0665 11.2333C13.8998 11.4 13.7026 11.4833 13.4748 11.4833C13.2471 11.4833 13.0498 11.4 12.8832 11.2333L7.99984 6.35001Z" fill="#005EB8" />
                          </g>
                        </svg>
                      </div>
                      {showTerms &&
                        <div className='termsD'>
                          <div dangerouslySetInnerHTML={{ __html: description }} />
                        </div>
                      } */}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="mc-custom-modal__center--window slow_ani">
                <div className="mc-custom-modal__close" onClick={close}>
                  <Icon name="close" />
                </div>

                {secondStatus && (
                  <div className="mc-custom-modal__center--window__disclaimer">
                    <img src="/assets/images/disclaimer.png" alt="" />
                    <div>¿Estás seguro de que deseas descargar este bono ?</div>
                    <div>
                      Una vez descargado, no podrás
                      <br />
                      cambiarlo por otro comercio.
                    </div>
                  </div>
                )}

                {redemtion && !secondStatus && (
                  <div className="mc-custom-modal__title type2">
                    Ya puedes
                    <br />
                    canjear tu bono
                  </div>
                )}

                {image && !postRedemtion && !secondStatus && (
                  <div
                    className="mc-custom-modal__center--window__image"
                    style={{ backgroundImage: `url(/assets/images/card/${image})` }}
                  ></div>
                )}
                {!secondStatus && (
                  <div
                    className={`mc-custom-modal__center--window__title ${desc == 'Multicines' ? 'is-multititle' : ''}`}
                  >
                    {postRedemtion && <img src="/assets/images/tick-redemtion.png" />}
                    {desc == 'Multicines' ? (
                      <>
                        <span>Incluye:</span>
                        {title.includes('10') && location === 5 && '1 boletos formato 2D'}
                        {title.includes('10') && location === 6 && '1 boletos formato 3D'}
                        {title.includes('20') &&
                          location === 5 &&
                          '1 boleto 2D + 1 combo N°1 o N°2'}
                        {title.includes('20') && location === 6 && '2 boletos formato 2D'}
                        {title.includes('20') && location === 7 && '2 boletos formato 2D o 3D'}
                        {title.includes('25') && '2 Boletos formato 2D + 1 combo N°4'}
                        {title.includes('30') && '2 Boleto formato VIP 2D'}
                      </>
                    ) : (
                      !postRedemtion && <span dangerouslySetInnerHTML={{ __html: title }} />
                    )}
                    {redemtion && link && <span>{link}</span>}
                  </div>
                )}

                {!redemtion && !secondStatus && (
                  <div className="mc-custom-modal__center--window__desc">
                    {!error && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                      >
                        <path
                          d="M4.87232 9.05135C4.87232 8.41891 5.12355 7.81238 5.57075 7.36518C6.01795 6.91798 6.62448 6.66675 7.25692 6.66675H11.6509C13.1739 6.66675 14.4489 7.557 15.3248 8.54899C15.9766 9.28663 16.7635 9.84622 17.5902 9.84622H24.744C25.3764 9.84622 25.983 10.0975 26.4302 10.5447C26.8774 10.9918 27.1286 11.5984 27.1286 12.2308V13.2482C28.0347 13.6695 28.6229 14.6409 28.4894 15.706L27.472 23.8518C27.3518 24.8136 26.8842 25.6984 26.1572 26.3396C25.4303 26.9808 24.494 27.3342 23.5247 27.3333H8.47465C7.50586 27.3334 6.57039 26.9797 5.84408 26.3385C5.11778 25.6974 4.65065 24.8131 4.53052 23.8518L3.51309 15.706C3.45041 15.2052 3.54824 14.6974 3.79249 14.2558C4.03674 13.8141 4.41482 13.4614 4.87232 13.2482V9.05135ZM6.46205 13.0257H25.5389V12.2308C25.5389 12.02 25.4551 11.8178 25.3061 11.6688C25.157 11.5197 24.9548 11.436 24.744 11.436H17.5902C16.0577 11.436 14.8717 10.436 14.1341 9.6014C13.4155 8.78745 12.5348 8.25648 11.6509 8.25648H7.25692C7.0461 8.25648 6.84393 8.34023 6.69486 8.48929C6.54579 8.63836 6.46205 8.84054 6.46205 9.05135V13.0257ZM5.87862 14.6154C5.76593 14.6155 5.65454 14.6394 5.55183 14.6858C5.44912 14.7322 5.35745 14.7998 5.28288 14.8843C5.20832 14.9688 5.15257 15.0682 5.11933 15.1759C5.0861 15.2835 5.07614 15.397 5.09011 15.5089L6.10754 23.6546C6.17963 24.2315 6.46 24.7622 6.89591 25.1469C7.33183 25.5316 7.89327 25.7438 8.47465 25.7436H23.5263C24.1076 25.7438 24.6691 25.5316 25.105 25.1469C25.5409 24.7622 25.8213 24.2315 25.8934 23.6546L26.9108 15.5089C26.9248 15.397 26.9148 15.2835 26.8816 15.1759C26.8483 15.0682 26.7926 14.9688 26.718 14.8843C26.6435 14.7998 26.5518 14.7322 26.4491 14.6858C26.3464 14.6394 26.235 14.6155 26.1223 14.6154H5.87862Z"
                          fill="#005EB8"
                        />
                      </svg>
                    )}

                    <div dangerouslySetInnerHTML={{ __html: desc }} />
                  </div>
                )}

                {twoStepAuth && !secondStatus && (
                  <div className="mc-custom-modal__center--window__auth">
                    <p>Doble autenticación</p>

                    <Input
                      type={'birthdate'}
                      label={'Fecha de expedición de su cédula'}
                      placeholder={'DD/MM/AAAA'}
                      onChange={handleChange}
                      inputByCharacter={false}
                      maxlength={10}
                      value={expDate}
                      error={errors.expDate}
                    />
                  </div>
                )}

                {redemtion ? (
                  secondStatus ? (
                    <div className="mc-custom-modal__center--window__actions extra-modal">
                      <Button
                        type="primary"
                        text={'Descargar bono'}
                        loading={primaryAction ? primaryAction.loading : false}
                        status={postRedemtion || error || base64Pdf ? true : primaryActionStatus}
                        onClick={
                          error || base64Pdf ? close : primaryAction ? primaryAction.action : close
                        }
                        redirect={base64Pdf ? '/mis-redenciones' : false}
                      />
                      <Button
                        type="secondary"
                        text={'Cancelar'}
                        loading={false}
                        status="active"
                        onClick={changeStatus}
                        redirect={base64Pdf ? '/mis-redenciones' : false}
                      />
                    </div>
                  ) : (
                    <div className="mc-custom-modal__center--window__actions">
                      <Button
                        type="primary"
                        text={
                          desc == 'Multicines'
                            ? 'Descargar boleto'
                            : primaryAction
                              ? primaryAction.buttonText
                              : cta
                        }
                        loading={primaryAction ? primaryAction.loading : false}
                        status={true}
                        onClick={changeStatus}
                        redirect={base64Pdf ? '/mis-redenciones' : false}
                      />
                      {secondaryAction && (
                        <Button
                          type="secondary"
                          text={secondaryAction.buttonText}
                          loading={false}
                          status="active"
                          onClick={secondaryAction.action}
                          redirect={base64Pdf ? '/mis-redenciones' : false}
                        />
                      )}
                    </div>
                  )
                ) : (
                  <div className="mc-custom-modal__center--window__actions">
                    <Button
                      type="primary"
                      text={primaryAction ? primaryAction.buttonText : cta}
                      loading={primaryAction ? primaryAction.loading : false}
                      status={
                        primaryAction
                          ? 'active'
                          : postRedemtion || error || base64Pdf
                            ? false
                            : primaryActionStatus
                      }
                      onClick={primaryAction?.action || close}
                      redirect={base64Pdf ? '/mis-redenciones' : false}
                    />
                    {secondaryAction && (
                      <Button
                        type="secondary"
                        text={secondaryAction.buttonText}
                        loading={false}
                        status="active"
                        onClick={secondaryAction.action}
                        redirect={base64Pdf ? '/mis-redenciones' : false}
                      />
                    )}
                  </div>
                )}

                {terms && !secondStatus && (
                  <div className="mc-custom-modal__center--window__terms">
                    <Link to={terms.termsLink} target="_blank" rel="noreferrer">
                      {terms.termsText}
                    </Link>
                  </div>
                )}

                {redemtion && !secondStatus && (
                  <div className="mc-custom-modal__center--window__extra">
                    <div>
                      Recuerda, puedes descargar tu bono las veces que quieras en la sección “Bono
                      canjeado”
                    </div>
                    <p>
                      El bono está sujeto a los{' '}
                      <a onClick={abrirPDF} href={termsPdfUrl}>
                        términos y condiciones
                      </a>{' '}
                      del comercio aliado.
                    </p>

                    {/* {desc == 'Multicines' &&
                        <div className={`anchor ${showTerms ? 'active' : ''}`} onClick={termsToggler}>
                          Conócelos aquí

                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <mask id="mask0_4421_11560" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                              <rect y="16" width="16" height="16" transform="rotate(-90 0 16)" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_4421_11560)">
                              <path d="M7.99984 6.35001L3.09984 11.25C2.93317 11.4167 2.73595 11.4972 2.50817 11.4917C2.28039 11.4861 2.08317 11.4 1.9165 11.2333C1.74984 11.0667 1.6665 10.8695 1.6665 10.6417C1.6665 10.4139 1.74984 10.2167 1.9165 10.05L7.04984 4.93334C7.18317 4.80001 7.33317 4.70001 7.49984 4.63334C7.6665 4.56668 7.83317 4.53334 7.99984 4.53334C8.1665 4.53334 8.33317 4.56668 8.49984 4.63334C8.6665 4.70001 8.8165 4.80001 8.94984 4.93334L14.0832 10.0667C14.2498 10.2333 14.3304 10.4278 14.3248 10.65C14.3193 10.8722 14.2332 11.0667 14.0665 11.2333C13.8998 11.4 13.7026 11.4833 13.4748 11.4833C13.2471 11.4833 13.0498 11.4 12.8832 11.2333L7.99984 6.35001Z" fill="#005EB8" />
                            </g>
                          </svg>
                        </div>
                      }
                      {showTerms &&
                        <div className='termsD'>

                          {desc == 'Multicines'
                            ? <>
                                {title.includes('10') &&
                                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,'
                                }
                                {title.includes('20') &&
                                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,'
                                }
                                {title.includes('25') &&
                                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,'
                                }
                                {title.includes('30') &&
                                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,'
                                }
                              </>
                            : <div dangerouslySetInnerHTML={{ __html: description }} />
                          }
                        </div>
                        } */}
                  </div>
                )}
              </div>
            </>
          )}
        </VerticalCenter>
      </div>
    </div>
  )
}

export default CustomModal
