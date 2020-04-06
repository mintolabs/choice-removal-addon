import React, { useEffect } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'
import { deepPurple, grey } from '@material-ui/core/colors'
import { createStructuredSelector } from 'reselect'
import { useSelector, useDispatch } from 'react-redux'
import { usePromiseTracker } from 'react-promise-tracker'

import { useInjectReducer } from 'store/configuration/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import { makeSelectUserEmail, makeSelectError } from './selectors'
import { getUserEmail } from './actions'
import reducer from './reducer'
import saga from './saga'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  plan: {
    fontWeight: '500',
    paddingBottom: '5px',
  },
  email: {
    color: deepPurple[500],
    paddingBottom: '10px',
    borderBottom: `1px solid ${grey[500]}`,
  },
}))

const key = 'settings'

const stateSelector = createStructuredSelector({
  userEmail: makeSelectUserEmail(),
  error: makeSelectError(),
})

const Settings = () => {
  useInjectReducer({ key, reducer })
  useInjectSaga({ key, saga })

  const classes = useStyles()

  const { userEmail } = useSelector(stateSelector)

  const dispatch = useDispatch()

  const { promiseInProgress } = usePromiseTracker()

  const handleGetUserEmail = () => {
    dispatch(getUserEmail())
  }

  /**
   * Get user email
   */
  useEffect(() => {
    handleGetUserEmail()
  }, [])

  return (
    <div>
      {!userEmail || promiseInProgress ? (
        <CircularProgress />
      ) : (
        <div>
          <div className={clsx(classes.row, classes.plan)}>
            <div>Plan:</div>
            <div>Free</div>
          </div>

          <div className={clsx(classes.row, classes.email)}>
            <div>Email:</div>
            <div>{userEmail}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings
