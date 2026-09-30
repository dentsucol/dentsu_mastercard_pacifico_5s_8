import React, { useEffect } from 'react'

import variables from '../../styles/base/variables.scss';
import VerticalCenter from '../../layouts/VerticalCenter/VerticalCenter';

import Icon from './Icon'

function ProgressCircle({
  percent, 
  label
}) {

  useEffect(() => {
    const stepStyle = `
      .mc-progressCircle-container__progress {
        background: 
          radial-gradient(
            closest-side, 
            white 84%, 
            transparent 85% 100%
          ), 
          conic-gradient(
            ${variables.primaryColor} ${percent > 100 ? 100 : percent}%, 
            ${variables.secondaryColor} 0
          );  
      }
    `
    const styleSheet = document.createElement("style")
    styleSheet.innerText = stepStyle
    document.head.appendChild(styleSheet)

  }, [])
  
  return (
    <div className="mc-progressCircle-container">
      <div 
        className="mc-progressCircle-container__progress" 
        role="progressbar" 
        aria-valuenow={percent} 
        aria-valuemin="0" 
        aria-valuemax="100"
      >
        <div 
          className="mc-progressCircle-container__progress--overlay"
          style={{transform: `rotate(${percent > 100 ? 100 : (percent + percent*2.55)}deg)`}}
        >
          <span>
            <Icon name="icon" />
          </span>
        </div>
        <VerticalCenter>
          {percent > 100 ? 100 : percent}%
          <span>
            {label}
          </span>
        </VerticalCenter>
      </div>
    </div>
  )
}

export default ProgressCircle