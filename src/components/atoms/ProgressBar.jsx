import React from 'react'

import Icon from './Icon'

function ProgressBar({
  title,
  percent, 
  label,
  icon,
  middle,
  dashboard,
  showPosition
}) {
  
  return (
    <div className={`mc-progressBar-container ${title ? 'has-title' : ''} ${middle ? 'col-2' : 'col-1'}`}>
      {title &&
        <div className='mc-progressBar-title'>
          {title}
        </div>
      }
      {dashboard &&
        <span className='mc-progressBar-label'>{`${percent}%`} {dashboard}</span>
      }
      <div className="mc-progressBar-progress" style={{"width": `${(percent) > 100 ? (100) : (percent)}%`}}>
        {showPosition &&
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none" style={{"left": `${(percent) >= 100 ? (98) : (percent)}%`}}>
            <g filter="url(#filter0_ddddd_3775_8964)">
              <circle cx="15" cy="15.1052" r="8" fill="white"/>
            </g>
            <defs>
            <filter id="filter0_ddddd_3775_8964" x="0" y="0.105225" width="30" height="30" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.88 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3775_8964"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="2"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.77 0"/>
              <feBlend mode="normal" in2="effect1_dropShadow_3775_8964" result="effect2_dropShadow_3775_8964"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="3"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.45 0"/>
              <feBlend mode="normal" in2="effect2_dropShadow_3775_8964" result="effect3_dropShadow_3775_8964"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="3.5"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.13 0"/>
              <feBlend mode="normal" in2="effect3_dropShadow_3775_8964" result="effect4_dropShadow_3775_8964"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="3.5"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.02 0"/>
              <feBlend mode="normal" in2="effect4_dropShadow_3775_8964" result="effect5_dropShadow_3775_8964"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect5_dropShadow_3775_8964" result="shape"/>
            </filter>
            </defs>
          </svg>
        }
      </div>
      <div className={`mc-progressBar-percent ${percent > 52 ? 'white' : ''}`}>
        {icon &&
          <Icon name={icon} />
        }
        {label && label}
      </div>
    </div>
  )
}

export default ProgressBar