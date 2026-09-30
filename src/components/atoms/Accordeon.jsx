import React, { useState } from 'react'

import Icon from './Icon'
import { sendDataLayer } from '../../utils/functions'

function Accordeon({
  title,
  id,
  content
}) {
  const [show, setShow] = useState(false)

  const toggler = (e) => {
    // setAllItems(!allItems)
    setShow(!show)

    if (e.target.closest('.mc-accordeon-container.active')) {
      return false
    }

    setTimeout( () => {
      sendDataLayer({
        datalayer: {
          event: 'frequently_questions',
          question: title
        },repeat: true})
    }, 50 )
  }

  return (
    <div className={`mc-accordeon-container slow_ani ${show ? 'active' : ''}`}>
      <div
        className="mc-accordeon-toggle slow_ani"
        onClick={toggler}
      >
        <ol start={id} style={{paddingLeft: '3%', margin: '0'}} data-gtm-event="frequently_questions">
          <li>{title}</li>
        </ol>
        <div className="mc-accordeon-toggle-icon">
          <Icon name="faq" />
        </div>
      </div>
      {show &&
        <div className="mc-accordeon-content">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      }
      <hr/>
    </div>
  )
}

export default Accordeon