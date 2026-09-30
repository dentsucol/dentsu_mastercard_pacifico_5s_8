import { createStore, combineReducers, compose, applyMiddleware } from "redux"

import userReducer, { restoreSessionAction } from "./sessionDuck"

import thunk from "redux-thunk"

/**
 * Reducers
 */

let rootReducer = combineReducers({
  user: userReducer,
});

/**
 * Devtools
 */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Store
 */

export default function generateStore() {
  let store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  )

  if (store && store.getState() && store.getState().user.loggedIn === false) restoreSessionAction()(store.dispatch)
  return store
}