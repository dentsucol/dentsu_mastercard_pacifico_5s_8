import React from 'react'

function Container({
  children, 
  className, 
  fullHeight
}) {
    return (
      <div className={`mc-app-container ${className ? className : ''} ${fullHeight ? 'mc-app-fullheight' : ''}`}>
        {children}
      </div>
    )
}

export default Container