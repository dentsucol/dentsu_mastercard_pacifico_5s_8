import { isLoggedIn, logOut, postLogin, postLoginSha } from "../services/auth.services"
import Swal from "sweetalert2";
import { sendDataLayer } from "../utils/functions";
import { gtUser } from "../utils/helpers";

/**
 * Constants
 */
const initialData = {
  loggedIn: false,
  fetching: false,
  token: "",
  error: ""
};
const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";

const LOG_OUT = "LOG_OUT";

/**
 * Reducer
 */
const reducer = (state = initialData, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, fetching: true };
    case LOGIN_SUCCESS:
      return { ...state, fetching: false, ...action.payload, loggedIn: true, error: "" };
    case LOGIN_ERROR:
      return { ...state, fetching: false, error: action.payload };
    case LOG_OUT:
      return { ...initialData, loggedIn: false, fetching: false };
    default:
      return state;
  }
}
export default reducer

export const logOutAction = () => (dispatch) => {
  logOut()
  dispatch({
    type: LOG_OUT,
  });
  localStorage.removeItem("storage");
  localStorage.removeItem("_grecaptcha")
  window.location.href = '/'
}

export const logOutIdleAction = () => (dispatch) => {
  logOut();
  dispatch({
    type: LOG_OUT,
  });
  localStorage.removeItem("storage");
  Swal.fire({
    icon: 'info',
    // title: 'Oops...',
    confirmButtonText: 'Aceptar',
    text: 'Su sesión ha caducado por inactividad durante varios minutos.',
  })
}

export const restoreSessionAction = () => (dispatch) => {
  let storage = localStorage.getItem("storage")
  storage = JSON.parse(storage)

  if (storage && storage.user.loggedIn) {
    
    if (storage && storage.user && storage.user.token && storage.user.token !== '') {
      isLoggedIn(storage.user.token).then(res => {
        if (res.status === 403) {
          dispatch({
            type: LOG_OUT,
          })
          localStorage.removeItem("storage")
          window.location.href = "/"
        } else {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: storage.user
          })
        }
      })
    }
  }
}

export const loginAction = (credentials, gToken, gversion) => async (dispatch, getState) => {

  dispatch({
    type: LOGIN,
  })
  try {
    const user = await postLogin(credentials, gToken, gversion)

    if (user && user.error && user.error === 'User not found') {
      localStorage.setItem('userNotFound', 'true')
      sendDataLayer({datalayer: { event: 'error_login', text: 'User not found' }, repeat: false})
      window.location.reload()
    }
    
    if (user && user.accessToken) { 
      let amountGoalCompleted = 0
      let userAmountGoalCompleted = 0
          
      setTimeout( () => {
        localStorage.removeItem('userNotFound')
      }, 2000 )
      
      gtUser(user.accessToken).then((userInfo) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            token: user.accessToken
          }
        })

        saveStorage(getState())

        if (userInfo?.data?.tracing) {
          amountGoalCompleted = userInfo?.data?.tracing['amount_1'] ? userInfo?.data?.tracing['amount_1'] : undefined
          userAmountGoalCompleted = userInfo?.data?.user['goal_amount_1'] ? userInfo?.data?.user['goal_amount_1'] : 0
        }

        sendDataLayer({datalayer: { 
          event: credentials.type === 'autologin' ? 'success_login_auto' : 'success_login', 
          userId: user.idmask, 
          idmask: user.idmask, 
          segment: user.segment,
          amount_goal_completed: amountGoalCompleted ? (amountGoalCompleted >= userAmountGoalCompleted ? 1 : 0) : 0,
        }, repeat: false})

        if (userInfo?.data) {
          if (userInfo?.data?.tracing && userInfo?.data?.tracing['winner_1'] == 1) {
            sendDataLayer({datalayer: { event: 'goal', winner_1: userInfo?.data?.tracing['winner_1'], winner_2: userInfo?.data?.tracing['winner_2'] },repeat: false})
          }
        }

      }).catch(() =>  {})
    } else {
      dispatch({
        type: LOGIN_ERROR,
        payload: user.message
      })
    }
  } catch (e) {

    dispatch({
      type: LOGIN_ERROR,
      payload: e.message
    })
  }
}

export const loginShaAction = (code_hash) => async (dispatch, getState) => {
  dispatch({
    type: LOGIN,
  })
  try {
    const user = await postLoginSha(code_hash)

    if (user && user.message && user.message === 'User Not found.') {
      localStorage.setItem('userNotFound', 'true')
    }
    
    if (user && user.accessToken) {

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: user.accessToken
        }
      });
      saveStorage(getState())
      sendDataLayer({datalayer: { event: 'success_login', userId: user.idmask, idmask: user.idmask, segment: user.segment },repeat: false})
      return true
    } else {

      dispatch({
        type: LOGIN_ERROR,
        payload: user.message
      })
      return false
    }
  } catch (e) {

    dispatch({
      type: LOGIN_ERROR,
      payload: e.message
    })
    return false
  }
}

/**
 * Aux Functions
 */
const saveStorage = (storage) => {
  localStorage.storage = JSON.stringify(storage)
}