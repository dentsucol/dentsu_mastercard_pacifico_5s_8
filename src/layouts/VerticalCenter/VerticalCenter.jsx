import React from 'react'

function VerticalCenter({children, className}) {
    return (
      <div className="mc-app-rely">
        <div className={`mc-app-centry ${className ? className : ''}`}>
          {children}
        </div>
      </div>
    )
}

export default VerticalCenter