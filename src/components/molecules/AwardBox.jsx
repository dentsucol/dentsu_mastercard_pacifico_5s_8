import React, { useState, useContext } from 'react'
import { connect } from 'react-redux'
import CustomModal from './CustomModal'
import Button from '../atoms/Button'
import Tag from '../atoms/Tag'

import { getPrice, sendDataLayer } from '../../utils/functions'
import { doloadRedeem } from '../../utils/helpers'
import { getAwardTermsPdf } from '../../utils/termsByAward'
import { StateController } from './../../App'

function AwardBox({
  index,
  type,
  award,
  canRedem,
  termLink,
  termText,
  redemtionText,
  showStock,
  token,
  download,
  twoStepAuth,
  inventory
}) {
  const { setAwardSelected, handlerRootModal } = useContext(StateController)
  const [downloadLoading, setDownloadLoading] = useState(false)
  const [showErrorDownload, setShowErrorDownload] = useState(false)
  const [showErrorRedemtion, setShowErrorRedemtion] = useState(false)
  const [dataEventValue, setDataEventValue] = useState('')
  const termsPdfUrl = getAwardTermsPdf(award)

  const abrirPDF = (e) => {
    e.preventDefault()
    sendDataLayer({
      datalayer: { event: 'bond_tyc', product_name: award?.name, product_price: award?.price },
      repeat: true
    })
    window.open(termsPdfUrl, '_blank', 'noopener,noreferrer')
  }

  const handlerModal = () => {
    if (!download) {
      sendDataLayer({
        datalayer: {
          event: 'bond_interest',
          product_name: award?.name,
          product_price: award?.price,
          index: index + 1
        },
        repeat: true
      })
    }

    if (download && !downloadLoading) {
      setDownloadLoading(true)

      doloadRedeem(award.id, token)
        .then((data) => {
          console.log('result download:', data)
          setDownloadLoading(false)
          setDataEventValue('redownload')
          sendDataLayer({
            datalayer: {
              event: 'redownload',
              product_name: award?.name,
              product_price: award?.price
            },
            repeat: true
          })

          if (data && (data.status === 402 || data.status === 400)) {
            setShowErrorDownload(true)
          }
        })
        .catch((error) => {
          console.log('ERROR DOWNLOAD REDENTION:', error)
          setDownloadLoading(false)
          setShowErrorDownload(true)
        })
    } else {
      if (canRedem) {
        handlerRootModal()
        setAwardSelected({
          image: award.image,
          price: award.price,
          name: award.name,
          link: award.link,
          canRedem: canRedem,
          id: award.id,
          location: award.location,
          brand_id: award.idbrand,
          twoStepAuth: twoStepAuth,
          index: index + 1,
          description: award.description
        })
      }
    }
  }

  return (
    <div className="mc-awards-container__items--item__container">
      <CustomModal
        title="Error en la descarga"
        desc={'Ocurrió un error al obtener tu bono. Intentalo de nuevo más tarde.'}
        cta="Aceptar"
        image="image.png"
        show={showErrorDownload}
        setShowModal={setShowErrorDownload}
      />
      <CustomModal
        title="Error en el canje"
        desc={'Ocurrió un error al obtener tu bono. Intentalo de nuevo más tarde.'}
        cta="Aceptar"
        image="image.png"
        show={showErrorRedemtion}
        setShowModal={setShowErrorRedemtion}
      />

      {award.prepurchased && !download && <Tag text="Precompra" />}
      {showStock && (
        <Tag position={'left'} text={`${award.stock} Disponible${award.stock > 1 ? 's' : ''}`} />
      )}

      {type === 2 && (
        <>
          <div className="mc-awards-container__items--item__info">
            <div
              className="mc-awards-container__items--item__image"
              style={{ backgroundImage: `url(/assets/images/card/${award.image})` }}
            ></div>
            <div className={`mc-awards-container__items--item__info ${download && 'download'}`}>
              {!download && (
                <>
                  {!inventory ? (
                    <div className="mc-awards-container__items--item__inventory no-stock">
                      Agotado
                    </div>
                  ) : (
                    <div className={`mc-awards-container__items--item__inventory ${inventory < 50 ? 'orange_alert' : 'green_alert'}`}>
                      {inventory >= 50 ? 'Más de 50 disponibles' : `${inventory} disponibles`}
                    </div>
                  )}
                </>
              )}
              <div className="mc-awards-container__items--item__name">{award.name}</div>
              {award.location == 5 ? (
                <div className="mc-awards-container__items--item__price cine">
                  <small>Incluye:</small>
                  <br />
                  {award.price == 10 && '1 boletos formato 2D'}
                  {award.price == 20 && '1 boleto 2D + 1 combo N°1 o N°2'}
                  {award.price == 25 && '2 Boletos formato 2D + 1 combo N°4'}
                  {award.price == 30 && '2 Boleto formato VIP 2D'}
                </div>
              ) : award.location == 6 ? (
                <div className="mc-awards-container__items--item__price cine">
                  <small>Incluye:</small>
                  <br />
                  {award.price == 10 && '1 boletos formato 3D'}
                  {award.price == 20 && '2 boletos formato 2D'}
                </div>
              ) : award.location == 7 ? (
                <div className="mc-awards-container__items--item__price cine">
                  <small>Incluye:</small>
                  <br />
                  {award.price == 20 && '2 boletos formato 2D o 3D'}
                </div>
              ) : (
                <div className="mc-awards-container__items--item__price">
                  US$ {getPrice(award.price, true)}
                </div>
              )}

              <div className="mc-awards-container__items--item__description">{award.link}</div>
            </div>
          </div>
          <Button
            type="primary"
            text={
              award.location == 5 || award.location == 6 || award.location == 7
                ? 'Canjear boleto'
                : redemtionText
            }
            loading={false}
            status={`${canRedem ? (!inventory && !download ? 'inactive' : 'active') : 'inactive'}`}
            icon="inline-block.png"
            awardIcon="inline-award.png"
            onClick={(e) => handlerModal(e)}
            dataEvent={download ? 'redownload' : 'bond_interest'}
          />
          {termLink && (
            <>
              {/* <div className='mc-awards-container__items--item__terms' dangerouslySetInnerHTML={{ __html: termText }}></div> */}
              <div className="mc-awards-container__items--item__terms">
                El bono está sujeto a los{' '}
                <a onClick={abrirPDF} href={termsPdfUrl}>
                  términos y condiciones
                </a>{' '}
                del comercio aliado.
              </div>
              {/* <a className='tycPDF' style={{fontWeight:'bolder',display:'block',margin:'0px auto', textAlign:'center'}} href={`/pdf/${award.image_secondary}`} target="_blank" rel="noopener noreferrer">Revisa aquí cómo canjearlo.</a> */}
            </>
          )}
        </>
      )}
    </div>
  )
}

const mapState = ({ user: { token } }) => {
  return {
    token
  }
}

export default connect(mapState)(AwardBox)
