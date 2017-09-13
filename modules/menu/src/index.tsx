import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import store from './store'
import Main from './containers/main'

ReactDOM.render(
  <Provider store={store} key="provider">
    <Main/>
  </Provider>,
  document.querySelector('#menu-visual') 
)