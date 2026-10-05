import React, { useState } from 'react'

import { sendDataLayer } from '../../utils/functions'
import Icon from '../atoms/Icon'

function Tabs({ sections }) {
  const [curSection, setCurSection] = useState(0)

  const goToTab = (e) => {
    const target = e.target

    if (target) {
      if (target.getAttribute('rel') == '0') {
        sendDataLayer({
          datalayer: { event: 'progress', text: 'Meta y progreso', link: 'N/A' },
          repeat: true
        })
      }
      if (target.getAttribute('rel') == '1') {
        sendDataLayer({
          datalayer: { event: 'progress', text: 'Tus metas cumplidas', link: 'N/A' },
          repeat: true
        })
      }

      setCurSection(Number(target.getAttribute('rel')))
    }
  }

  return (
    <div className={`mc-tabs-container current-${curSection}`}>
      <div className={`mc-tabs-container--head`}>
        {sections.map((section, index) => {
          return (
            <button
              key={index}
              data-gtm-event="progress"
              className="mc-tabs-container--head__tab"
              rel={index}
              onClick={goToTab}
            >
              <Icon name={section.icon} />
              {section.title}
            </button>
          )
        })}
        <span></span>
      </div>
      <div className={`mc-tabs-container--content`}>
        {sections.map((section, index) => {
          return (
            <div key={index} className={`mc-tabs-container--content__body`}>
              {section.content}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Tabs
