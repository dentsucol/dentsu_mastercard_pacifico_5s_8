import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import generateStore from './store/index'
import { BrowserRouter } from 'react-router-dom'
import { GTMProvider } from './context/gtm-service'
import App from './App'

const store = generateStore()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <GTMProvider>
      <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </Provider>
  </GTMProvider>
)