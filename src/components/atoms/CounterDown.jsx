import React, { useContext, useEffect, useState } from 'react'

import { StateController } from './../../App'
import Preloader from './Preloader'

function CounterDown({
  showDays,
  showHours,
  showMins,
  showSegs,
  location,
  setShowCounter
}) {
  const {context} = useContext(StateController)
  const [counterDays, setCounterDays] = useState(0)
  const [counterHours, setCounterHours] = useState(0)
  const [counterMins, setCounterMins] = useState(0)
  const [counterSegs, setCounterSegs] = useState(0)
  const [end, setEnd] = useState(false)
  
  useEffect(() => {
    const countDownDate = new Date('2024-11-30 23:59:59').getTime()

    const startCountdown = () => {
      const timer = setInterval(function() {
        let now = new Date().getTime();
        let distance = countDownDate - now;
          
        if (distance < 0) {
          setEnd(true)
          clearInterval(timer)
        }

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
        setCounterDays(days)
        setCounterHours(hours)
        setCounterMins(minutes)
        setCounterSegs(seconds)
      }, 1000)
    }
    startCountdown()
  }, [context])

  const closeCounter = () => {
    setShowCounter(false)
  }

  return (
    <div className={`mc-counter-down position-${location}`}>
      <button onClick={closeCounter} className='close-button'>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M6.21967 6.21967C6.51256 5.92678 6.98744 5.92678 7.28033 6.21967L17.7803 16.7197C18.0732 17.0126 18.0732 17.4874 17.7803 17.7803C17.4874 18.0732 17.0126 18.0732 16.7197 17.7803L6.21967 7.28033C5.92678 6.98744 5.92678 6.51256 6.21967 6.21967Z" fill="#F0F7FF"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M17.7803 6.21967C18.0732 6.51256 18.0732 6.98744 17.7803 7.28033L7.28033 17.7803C6.98744 18.0732 6.51256 18.0732 6.21967 17.7803C5.92678 17.4874 5.92678 17.0126 6.21967 16.7197L16.7197 6.21967C17.0126 5.92678 17.4874 5.92678 17.7803 6.21967Z" fill="#F0F7FF"/>
      </svg>
      </button>
      <div>
        <div id="countdown">
          {end
            ? <>El contador finalizó</>
            : <>
                <p>¡Quedan pocos días para ganar!</p>
                <ul>
                  {showDays && <li><span id="days">{counterDays}</span>Días</li>}
                  {showHours && <li><span id="hours">{counterHours}</span>Horas</li>}
                  {showMins && <li><span id="minutes">{counterMins}</span>Minutos</li>}
                  {showSegs && <li><span id="seconds">{counterSegs}</span>Segundos</li>}
                </ul>
              </>
          }   
        </div>
      </div>
    </div>
  )
}

export default CounterDown