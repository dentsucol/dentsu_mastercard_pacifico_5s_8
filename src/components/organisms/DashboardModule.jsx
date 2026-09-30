import React from 'react'

import Button from '../atoms/Button'

function DashboardModule({
  col,
  title,
  reportAction,
  reportSecondAction,
  children
}) {

  return (
    <div className={`mc-dashboard-module col-${col ? col : '1'}`}>
      <h4>{title}</h4>

      <div className='mc-dashboard-module__content'>
        {children}
      </div>

      {reportAction &&
        <div className='mc-dashboard-module__actions'>
          <Button
            type="primary"
            text={reportAction.text}
            loading={reportAction.loading}
            status="active"
            onClick={reportAction.onClick}
          />

          {reportSecondAction &&
            <Button
              type="primary"
              text={reportSecondAction.text}
              loading={reportSecondAction.loading}
              status="active"
              onClick={reportSecondAction.onClick}
            />
          }
        </div>
      }
    </div>
  )
}

export default DashboardModule