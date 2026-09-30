import React from 'react'

import VerticalCenter from '../VerticalCenter/VerticalCenter'

function Columns({
  desktop,
  mobile,
  height,
  children,
}) {

  return (
    <div className={`
      mc-app-columns 
      mc-app-columns__col-desk-${desktop} 
      mc-app-columns__col-mobile-${mobile}`}
      style={{"height": `${height ? `${height}px` : 'auto'}`}}
    >
      {children.map((child) => {
        return child
      })}
    </div>
  )
}
export default Columns

export function Col({children, className}) {

  return (
    <div className='mc-app-columns__item'>
      <VerticalCenter className={className}>
        {children}
      </VerticalCenter>
    </div>
  )
}