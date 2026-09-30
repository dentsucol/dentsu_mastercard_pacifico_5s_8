import React from 'react'

function Tag({
  text,
  position
}) {


  return (
    <div className={`mc-tag-card position-${position ? position : 'right'}`}>
      {text}
    </div>
  )
}

export default Tag