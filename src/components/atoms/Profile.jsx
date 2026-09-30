import React, { useEffect, useState } from 'react'

function Profile({
  nickname,
  defaultLetter
}) {
  const [letters, setLetters] = useState('')

  useEffect(() => {
    
    if (nickname) {
      const names = nickname.split(' ')

      if (names[0][0]) {
        setLetters(
          `${names[0][0]}${names[1] ? names[1][0] : ''}`
        )
      } else {
        setLetters(
          defaultLetter
        )
      }
      
    }
  }, [nickname])
  
  return (
    <div className={`mc-profile-card`}>
      <div className={`mc-profile-avatar`}>
        <div className={`mc-profile-avatar__letters slow_ani`}>{letters}</div>
      </div>
      <div className={`mc-profile-name slow_ani`}>Hola{nickname ? ',' : ''} <strong>{nickname}</strong></div>
    </div>
  )
}

export default Profile