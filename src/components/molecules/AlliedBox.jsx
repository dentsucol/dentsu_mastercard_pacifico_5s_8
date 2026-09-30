import { sendDataLayer } from '../../utils/functions'
import React, { useState } from 'react'
import CustomModal from './CustomModal'
import Icon from '../atoms/Icon'

function AlliedBox({
  type,
  allied,
  termLink,
  termText,
  termsOnModal,
  termsData
}) {
  const [showOnModal, setShowOnModal] = useState(false)
  const [dropTyc, setDropTyc] = useState(false);
  
  const dataLayerAllied = (content) => {
    sendDataLayer({ datalayer: { event: "alliances", text: content?.name, link: window.location.href }, repeat: true })
  }
  const modalToggler = () => {
    setShowOnModal(!showOnModal)
  }
  console.log('allied',allied)
  return (
    <div className={`mc-alliances-container__items--item__container allies-type-${type} ${termsOnModal ? 'terms' : ''}`}>
      {type === 1 &&
        <>
          <div className="mc-alliances-container__items--item__image">
            <span style={{ "backgroundImage": `url(/assets/images/${allied.image})` }}>
              <img src="/assets/images/dummy.png" alt="Dummy" className='dummy' />
            </span>
          </div>
          <div className="mc-alliances-container__items--item__info">
            <div className="mc-alliances-container__items--item__title">{allied.name}</div>
            <div className="mc-alliances-container__items--item__desc">
              <div dangerouslySetInnerHTML={{ __html: allied.description }} />
            </div>
            {termLink &&
              termsOnModal
              ? <button className='mc-alliances-button' onClick={modalToggler}>
                {termText}
              </button>
              : <a onClick={() => dataLayerAllied(allied)} href={termLink} target='_blank' rel="noreferrer">
                {termText}
              </a>
            }
          </div>
        </>
      }
      {type === 2 &&
        <>
          <div className="mc-alliances-container__items--item__image">
            <span style={{ "backgroundImage": `url(/assets/images/${allied.image})` }}>
              <img src="/assets/images/dummy.png" alt="Dummy" className='dummy' />
            </span>
          </div>
          <div className="mc-alliances-container__items--item__info">
            <div className="mc-alliances-container__items--item__rule">{allied.rule}</div>
            <div className="mc-alliances-container__items--item__title">{allied.name}</div>
          </div>
          <div className="mc-alliances-container__items--item__desc">
            <div dangerouslySetInnerHTML={{ __html: allied.description }} />
          </div>
          {termLink &&
            <a onClick={(e) => dataLayerAllied(e, allied.name)} href={termLink} target='_blank' rel="noreferrer">
              {termText}
            </a>
          }
        </>
      }
      {type === 3 &&
        <>
          <div className="mc-alliances-container__items--item__info">
            <div className="mc-alliances-container__items--item__image">
              <span style={{ "backgroundImage": `url(/assets/images/${allied.image})` }}>
                <img src="/assets/images/dummy.png" alt="Dummy" className='dummy' />
              </span>
            </div>
            <div className="mc-alliances-container__items--item__labels">
              <div className="mc-alliances-container__items--item__title">{allied.name}</div>
              <div className="mc-alliances-container__items--item__rule">{allied.rule}</div>
            </div>
          </div>
          <div className="mc-alliances-container__items--item__desc">
            <div dangerouslySetInnerHTML={{ __html: allied.description }} />
          </div>
          {termLink &&
            <a onClick={(e) => dataLayerAllied(e, allied.name)} href={termLink} target='_blank' rel="noreferrer">
              {termText}
            </a>
          }
        </>
      }
      {type === 4 &&
        <>
          <div className="mc-alliances-container__items--item__info">
            <div className="mc-alliances-container__items--item__image">
              <span style={{ "backgroundImage": `url(/assets/images/${allied.image})` }}>
                <img src="/assets/images/dummy.png" alt="Dummy" className='dummy' />
              </span>
            </div>
            <div className="mc-alliances-container__items--item__labels">
              <div className="mc-alliances-container__items--item__title">{allied.name}</div>
              <div className="mc-alliances-container__items--item__rule">{allied.rule}</div>
              <div className="mc-alliances-container__items--item__desc">
                <div dangerouslySetInnerHTML={{ __html: allied.description }} />
              </div>
              {termLink &&
                <a onClick={(e) => dataLayerAllied(e, allied.name)} href={termLink} target='_blank' rel="noreferrer">
                  {termText}
                </a>
              }
            </div>
          </div>
        </>
      }

      {type === 5 &&
        <>
          <div className="mc-alliances-container__items--item__image">
            <span style={{ "backgroundImage": `url(/assets/images/${allied.image})` }}>
              <img src="/assets/images/dummy.png" alt="Dummy" className='dummy' />
            </span>
          </div>
          <div className="mc-alliances-container__items--item__info">
            <div className="mc-alliances-container__items--item__title">{allied.name}</div>
            <div className="mc-alliances-container__items--item__desc">
              <div dangerouslySetInnerHTML={{ __html: allied.subDescription }} />
            </div>

            <div className="tycDropdown">
              <h3 onClick={() => setDropTyc(!dropTyc)}>Aplica términos y condiciones <span className={`iconDrop ${dropTyc ? 'rotateIcon' : ''}`}><Icon name='more' /></span></h3>
              <div className={`content-tyc ${dropTyc ? 'active' : ''}`} dangerouslySetInnerHTML={{__html:allied.description }} />
            </div>
          </div>
        </>
      }

      <CustomModal
        title="Términos y condiciones"
        desc={termsData}
        cta="Aceptar"
        icon={false}
        show={showOnModal} setShowModal={setShowOnModal}
        termsOnModal={true}
      />
    </div>
  )
}

export default AlliedBox