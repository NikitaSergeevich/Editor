import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
// import configureStore from './store'
import MainScreen from './containers/main'

// const store = configureStore()

import store from './store'

ReactDOM.render(
  <Provider store={store} key="provider">
    <MainScreen/>
  </Provider>,
  document.querySelector('#planning-document-wrapper') 
)