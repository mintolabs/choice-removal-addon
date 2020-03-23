import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'
import { createStructuredSelector } from 'reselect'
import { useSelector, useDispatch } from 'react-redux'
import { usePromiseTracker } from 'react-promise-tracker'

import { useInjectSaga } from 'utils/injectSaga'

import SlidingMenu from 'components/SlidingMenu'
import Question from 'components/Question'
import { makeSelectError, makeSelectSupportedQuestions } from './selectors'
import { getSupportedFormQuestions } from './actions'
import saga from './saga'

const key = 'global'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const stateSelector = createStructuredSelector({
  supportedQuestions: makeSelectSupportedQuestions(),
  error: makeSelectError(),
})

const Configuration = () => {
  useInjectSaga({ key, saga })

  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)

  const { supportedQuestions, error } = useSelector(stateSelector)

  const dispatch = useDispatch()

  const { promiseInProgress } = usePromiseTracker()

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleGetSupportedFormQuestions = async () => {
    dispatch(getSupportedFormQuestions())
  }

  /**
   * Get user data from database
   */
  useEffect(() => {
    handleGetSupportedFormQuestions()
  }, [])

  return (
    <div>
      <SlidingMenu />

      <div className={classes.root}>
        {!supportedQuestions || promiseInProgress ? (
          <CircularProgress />
        ) : (
          <div>
            {supportedQuestions.map(question => (
              <Question question={question} expanded={expanded} handleChange={handleChange} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Configuration
