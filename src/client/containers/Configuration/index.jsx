import React from 'react'
import { Redirect, Route, Switch as RouterSwitch } from 'react-router-dom'

import { PATHS } from 'config/constants'

import SlidingMenu from 'components/SlidingMenu'
import QuestionList from 'containers/QuestionList'

import GlobalStyle from 'components/GlobalStyle'

const Configuration = () => {
  return (
    <div>
      <SlidingMenu />

      <Redirect to={PATHS.CONFIGURATION} />
      <RouterSwitch>
        <Route path={PATHS.CONFIGURATION} exact render={() => <QuestionList />} />
      </RouterSwitch>

      <GlobalStyle />
    </div>
  )
}

export default Configuration
