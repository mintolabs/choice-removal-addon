import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import Configuration from 'containers/Configuration'
import configureStore from 'store/configuration/configureStore'

const initialState = {}
const store = configureStore(initialState)

render(
  <Provider store={store}>
    <Router>
      <Configuration />
    </Router>
  </Provider>,
  document.getElementById('index')
)
