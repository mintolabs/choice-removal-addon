import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, CircularProgress } from '@material-ui/core'
import { Refresh } from '@material-ui/icons'
import { deepPurple } from '@material-ui/core/colors'
import { createStructuredSelector } from 'reselect'
import { useSelector, useDispatch } from 'react-redux'
import { usePromiseTracker } from 'react-promise-tracker'

import { useInjectSaga } from 'utils/injectSaga'
import { PREFIXES } from 'config/constants'
import Question from 'components/Question'
import {
  makeSelectError,
  makeSelectSupportedQuestions,
  makeSelectConfiguration,
} from 'containers/Configuration/selectors'
import {
  getCurrentUser,
  getSupportedFormQuestions,
  getConfiguration,
  updateConfiguration,
} from 'containers/Configuration/actions'
import saga from './saga'

const key = 'questionList'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshButtonContainer: {
    textAlign: 'center',
  },
  refreshButton: {
    marginBottom: '1rem',
    color: deepPurple[500],
  },
}))

const stateSelector = createStructuredSelector({
  error: makeSelectError(),
  supportedQuestions: makeSelectSupportedQuestions(),
  configuration: makeSelectConfiguration(),
})

const QuestionList = () => {
  useInjectSaga({ key, saga })

  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)

  const { error, supportedQuestions, configuration } = useSelector(stateSelector)

  const dispatch = useDispatch()

  const { promiseInProgress } = usePromiseTracker()

  const handleGetCurrentUser = () => {
    dispatch(getCurrentUser())
  }

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleGetSupportedFormQuestions = async () => {
    dispatch(getSupportedFormQuestions())
    dispatch(getConfiguration())
  }

  const handleToggleSwitch = (event, questionId) => {
    dispatch(updateConfiguration(questionId, event.target.checked))
  }

  /**
   * Get user data from database
   */
  useEffect(() => {
    handleGetCurrentUser()
    handleGetSupportedFormQuestions()
  }, [])

  return (
    <div>
      <div className={classes.refreshButtonContainer}>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          aria-label="refresh"
          onClick={handleGetSupportedFormQuestions}
          disabled={promiseInProgress}
          className={classes.refreshButton}
        >
          Refresh Question List
        </Button>
      </div>

      <div className={classes.root}>
        {!supportedQuestions || configuration === undefined || promiseInProgress ? (
          <CircularProgress />
        ) : (
          <div>
            {supportedQuestions.map(question => {
              const questionConfigKey = `${PREFIXES.QUESTION_ID}${question.id}`
              const questionConfig = !!(
                configuration &&
                configuration[questionConfigKey] &&
                configuration[questionConfigKey].enabled
              )

              return (
                <Question
                  question={question}
                  questionConfig={questionConfig}
                  expanded={expanded}
                  handleChange={handleChange}
                  toggleSwitch={handleToggleSwitch}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionList
