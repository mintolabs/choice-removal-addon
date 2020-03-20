import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import Configuration from 'containers/Configuration'
import configureStore from 'store/configuration/configureStore'

const initialState = {}
const store = configureStore(initialState)

render(
  <Provider store={store}>
    <Configuration />
  </Provider>,
  document.getElementById('index')
)
