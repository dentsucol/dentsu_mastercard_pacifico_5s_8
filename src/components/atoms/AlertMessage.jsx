import React from 'react'

function AlertMessage({
  type,
  title,
  message,
  blocked,
  children
}) {

  return (
    <div className={`mc-alert-message mc-alert-message__${type} ${blocked ? 'blocked' : ''}`}>
      <h3>{title}</h3>
      <p>{message}</p>

      {children}
    </div>
  )
}

export default AlertMessage