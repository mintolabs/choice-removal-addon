import React from 'react'
import { Redirect, Route, Switch as RouterSwitch } from 'react-router-dom'

import { PATHS } from 'config/constants'

import SlidingMenu from 'components/SlidingMenu'
import QuestionList from 'containers/QuestionList'
import Settings from 'containers/Settings'
import Help from 'containers/Help'

import GlobalStyle from 'components/GlobalStyle'

const Configuration = () => {
  return (
    <div>
      <SlidingMenu />

      <Redirect to={PATHS.QUESTION_LIST} />
      <RouterSwitch>
        <Route path={PATHS.QUESTION_LIST} exact render={() => <QuestionList />} />
        <Route path={PATHS.SETTINGS} exact render={() => <Settings />} />
        <Route path={PATHS.HELP} exact component={Help} />
      </RouterSwitch>

      <GlobalStyle />
    </div>
  )
}

export default Configuration
