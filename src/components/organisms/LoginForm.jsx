import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { RECAPCHAKEY, GLOBAL_CODE, RECAPCHAKEYSAFARI } from "../../constants/constants"

import Container from '../../layouts/Container/Container'
import Input from '../atoms/Input'
import Button from '../atoms/Button'
import Preloader from '../atoms/Preloader'

// actions
import { loginAction } from './../../store/sessionDuck'
import { sendDataLayer } from '../../utils/functions'

function LoginForm({
  type,
  fields,
  buttonText,
  loginAction,
  autologin,
  hash,
  title,
  setGlobalLoader
}) {
  const [code, setCode] = useState('')
  const [card, setCard] = useState('')
  const [terms, setTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [extraLoginPreloader, setExtraLoginPreloader] = useState(false)
  
  const [errors, setErrors] = useState({
    document: false,
    emailPhone: false,
    birthdate: false,
    code: false,
    card: false,
    terms: false,
    termsData: false,
    login: false
  })
  const [gToken, setGToken] = useState(false);
  const [gVersion, setGVersion] = useState('V3');
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

  const handleChange = async (props) => {    
    const element = props.target.getAttribute('rel')
    const field = fields.find((field) => field.field === element)    

    if (element === 'code') {
      if (props.target.value.length < field.maxlength+1) {
        setCode(props.target.value)
        setErrors({ ...errors, code: false})
      }
    }
    if (element === 'terms') {
      setTerms(props.target.checked)
      setErrors({ ...errors, terms: false})
    }
  }

  const handleLogin = async (e) => {
    sendDataLayer({datalayer: { event: "button_login" }, repeat: true})

    setIsLoading(true)
    const field_code = fields.find((field) => field.field === 'code')
    const field_terms = fields.find((field) => field.field === 'terms')

    if (field_code && code.length <= (field_code ? field_code.maxlength-1 : 10)) {
      setIsLoading(false)
      setErrors({ ...errors, code: 'Inserta tu código.'})
      sendDataLayer({datalayer: { event: 'error_login', text: 'Inserta tu código.' }, repeat: true})
      return false
    }

    if (field_terms && !terms) {
      setIsLoading(false)
      setErrors({ ...errors, terms: 'Acepta los términos y condiciones para continuar.'})
      sendDataLayer({datalayer: { event: 'error_login', text: 'Acepta los términos y condiciones para continuar.' }, repeat: true})
      return false
    }

    setExtraLoginPreloader(true)
    setGlobalLoader(true)

    let captcha;

    try {
      captcha = await getCaptchaToken();
    } catch (error) {
      setIsLoading(false);
      setErrors({ ...errors, login: 'No se pudo validar el captcha. Intenta nuevamente.' });
      return false;
    }

    try {
      await loginAction({
        campaignCode: GLOBAL_CODE,
        type: "credentials",
        credentials: {
          code: code
        },
        actions: "none"
      }, captcha.token, captcha.version);
    } catch (error) {
      console.error("Error en login:", error);
    }
  }

  const getCaptchaToken = () => {
    return new Promise((resolve, reject) => {
      if (!window.grecaptcha) {
        reject('reCAPTCHA no cargó');
        return;
      }

      window.grecaptcha.ready(() => {
        if (isSafari) {
          window.onSubmit = function (token) {
            setGToken(token);
            setGVersion('V2');
            resolve({ token, version: 'V2' });
          };

          window.grecaptcha.execute();
        } else {
          window.grecaptcha
            .execute(RECAPCHAKEY, { action: 'login' })
            .then((token) => {
              setGToken(token);
              setGVersion('V3');
              resolve({ token, version: 'V3' });
            })
            .catch(reject);
        }
      });
    });
  };

  const handleLoaded = () => {
    console.log('reCAPTCHA loaded');
  };

  useEffect(() => {
    const script = window.document.createElement("script");
    script.src = isSafari
      ? "https://www.google.com/recaptcha/api.js"
      : `https://www.google.com/recaptcha/api.js?render=${RECAPCHAKEY}`;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", handleLoaded)    
    window.document.body.appendChild(script)
  }, []);

  useEffect(() => {
    if (hash && hash !== '') {
      setIsLoading(true)

      if (!localStorage.getItem('userNotFound')) {
        loginAction({
          campaignCode: GLOBAL_CODE,
          type: "autologin",
          credentials: {
            code_hash: hash
          },
          actions: "none"
        }, gToken, gVersion)
      }
    }
  }, [hash])
  
  return (
    <div className={`mc-login mc-login-${type}`}>

      {isSafari ? (
        <div className="g-recaptcha"
          data-sitekey={RECAPCHAKEYSAFARI}
          data-callback="onSubmit"
          data-size="invisible">
        </div>
      ) : (
        <div
          className="g-recaptcha"
          data-sitekey={RECAPCHAKEY}
          data-size="invisible"
        ></div>
      )}

      {(extraLoginPreloader || autologin) &&
        <Preloader
          type="fullscreen"
          invert={true}
        />
      }

      <Container className="full-height">
        <h2>{title}</h2>
        <div className='mc-login__form'>
          {isLoading &&
            <div className='mc-login__form--overlay slow_ani'></div>
          }
          <div className='mc-login__form--fields'>
            {fields.map((field, index) => {
              
              return (
                <Input 
                  key={index}
                  type={field.field}
                  text={field.text}
                  label={field.label}
                  placeholder={field.placeholder}
                  termsText={field.termsText}
                  termsLink={field.termsLink}
                  onChange={handleChange}
                  inputByCharacter={field.separated ? field.separated : false}
                  maxlength={field.maxlength}
                  value={field.field === 'terms' ? terms : field.field === 'code' ? code : false}
                  error={field.field === 'terms' ? errors.terms : field.field === 'code' ? errors.code : false}
                />
              )
            })}
          </div>
          <Button
            type="primary"
            text={buttonText}
            loading={isLoading}
            disabled={!code}
            status="active"
            dataEvent="button_login"
            onClick={handleLogin}
          />
        </div>
      </Container>

    </div>
  )
}

const mapState = ({ user: { token } }) => {

  return {
    token
  }
}

export default connect(mapState, { loginAction })(LoginForm)