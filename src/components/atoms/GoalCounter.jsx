import React, { useContext, useState, useEffect } from 'react'

import { StateController } from './../../App'
import Preloader from './Preloader'

function GoalCounter({
  label,
  rule
}) {
  const {context} = useContext(StateController)
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    if (context && context.user && context.tracing) {
      const block = 1
      const currentGoal = context ? context.user[`goal_amount_${block}`] : 0
      const currentTracing = context ? context.tracing[`amount_${block}`] : 0

      if (currentGoal) {
        if((context.user[`goal_category_1`] - context.tracing?.categories?.split(',').length) > 0)
          setCounter(0)
        else if (currentTracing === currentGoal) {
          setCounter(1)
        } else if (currentTracing > currentGoal) {

          setCounter(
            rule === 'complete' ? Math.floor(currentTracing / currentGoal) : (currentTracing / currentGoal).toFixed(1)
          )
        }
      }
    }
  }, [context])

  return (
    <div className={`mc-goal-counter`}>
      
      <div>
        {context
          ? <>{label} <span>{counter} {counter === 1 ? 'vez' : 'veces'}</span></>
          : <Preloader
              type="section"
              invert
            />
        }
      </div>
    </div>
  )
}

export default GoalCounter