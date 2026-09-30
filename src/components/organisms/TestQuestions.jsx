import React, { useState } from 'react'
import Container from '../../layouts/Container/Container'
import Button from '../atoms/Button'

import {
  stQuiz
} from './../../utils/helpers'
import { connect } from 'react-redux'
import { sendDataLayer } from '../../utils/functions'
import Icon from '../atoms/Icon'

function TestQuestions({
  token, 
  title,
  quizNumber,
  from
}) {
  const [yesOrNot, setYesOrNot] = useState(false)
  const [response, setResponse] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [ok, setOk] = useState(false)

  const respond = (str) => {
    setYesOrNot(str)
  }
  const handleQuiz = () => {
    sendDataLayer({datalayer: { event: 'survey', text: yesOrNot, site_url: from === 'progress' ? '/progreso' : from === 'mis-redenciones' ? '/mis-redenciones' : '/mecanica' },repeat: true})
    
    if (!ok) {
      setIsLoading(true)
  
      stQuiz(token, yesOrNot, response, quizNumber).then((res) => {
  
        if (res && res.statusCode === 200) {
          setYesOrNot(false)
          setResponse("")
          setOk(true)
        }
        setIsLoading(false)
      }).catch(() => {
        setIsLoading(false)
      })
    }
  }
  const handleChange = async (e) => {
    if (e.target.value.length <= 500) setResponse(e.target.value)
  }

  return (
    <div className={`mc-test-questions`}>
      <Container>
          {ok && <Icon name="check-blue"/>}
          
            {ok
            ? <h4 className='mc-test-questions--response'>¡Gracias por tu respuesta!</h4>
            : title
              ? <h4>{title}</h4>
              : <h4>¿Este contenido te ayudó a entender la dinámica de la campaña?</h4>
          }
          
        {!ok &&
          <div className='mc-test-questions--buttons'>
            <button className={`si ${yesOrNot === 'Si' ? 'active': ''}`} onClick={() =>respond('Si')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M8.66667 3.25377C8.66667 2.28519 9.45186 1.5 10.4204 1.5H10.5C11.9728 1.5 13.1667 2.69391 13.1667 4.16667V7.33333H16.1366C18.119 7.33333 19.4083 9.4195 18.5217 11.1926L15.6051 17.0259C15.1534 17.9293 14.23 18.5 13.2199 18.5H9.87184C9.65381 18.5 9.4366 18.4733 9.22508 18.4204L6.21023 17.6667H4.66667C3.19391 17.6667 2 16.4728 2 15V10C2 8.52724 3.19391 7.33333 4.66667 7.33333H6.3537L8.32823 4.37154C8.54891 4.04053 8.66667 3.6516 8.66667 3.25377ZM5.33333 9.33333H4.66667C4.29848 9.33333 4 9.63181 4 10V15C4 15.3682 4.29848 15.6667 4.66667 15.6667H5.33333V9.33333ZM7.33333 15.8859L9.71015 16.4801C9.76303 16.4933 9.81733 16.5 9.87184 16.5H13.2199C13.4725 16.5 13.7033 16.3573 13.8162 16.1315L16.7329 10.2981C16.9545 9.85488 16.6322 9.33333 16.1366 9.33333H10.5C9.94772 9.33333 9.5 8.88562 9.5 8.33333C9.5 7.78105 9.94772 7.33333 10.5 7.33333H11.1667V4.16667C11.1667 3.85288 10.9499 3.58973 10.6579 3.51881C10.6116 4.21827 10.3829 4.89512 9.99233 5.48094L7.33333 9.46944V15.8859Z" fill="#002F87"/>
              </svg>
              Sí
            </button>
            <button className={`no ${yesOrNot === 'No' ? 'active': ''}`} onClick={() =>respond('No')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M8.33334 11.6667H4.3634C3.12443 11.6667 2.3186 10.3628 2.87269 9.25464L5.78935 3.42131C6.07167 2.85667 6.64878 2.5 7.28006 2.5H10.6282C10.7644 2.5 10.9002 2.51671 11.0324 2.54976L14.1667 3.33333M8.33334 11.6667V15.8333C8.33334 16.7538 9.07953 17.5 10 17.5H10.0796C10.4959 17.5 10.8333 17.1625 10.8333 16.7462C10.8333 16.151 11.0095 15.569 11.3397 15.0738L14.1667 10.8333V3.33333M8.33334 11.6667H10M14.1667 3.33333H15.8333C16.7538 3.33333 17.5 4.07952 17.5 5V10C17.5 10.9205 16.7538 11.6667 15.8333 11.6667H13.75" stroke="#002F87" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              No
            </button>
          </div>
        }

        {!ok &&
          <div className={`mc-test-questions--details slow_ani  active ${isLoading ? 'loading' : ''}`}>
            {yesOrNot &&
              <>
                <p>
                  Cuéntanos más detalles
                </p>
                <textarea className={!yesOrNot ? 'disabled' : 'true'} disabled={yesOrNot ? false : true} onChange={handleChange} value={`${response ? response : ''}`} placeholder='Escribe aquí tus comentarios'></textarea>
                <span className='mc-test-questions--live'>{response ? response.length : 0} de 500 caracteres</span>
              </>
            }
            
            <Button
              type="primary"
              text="Enviar"
              loading={isLoading}
              status={yesOrNot ? 'active' : 'inactive'}
              onClick={handleQuiz}
              dataEvent="survey"
            />
          </div>
        }
      </Container>
    </div>
  )
}

const mapState = ({ user: {token} }) => {
  return {
    token
  }
}

export default connect(mapState, {})(TestQuestions)