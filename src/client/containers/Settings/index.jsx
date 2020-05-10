import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { CircularProgress, TextField, Button } from '@material-ui/core'
import { Restore, SaveOutlined } from '@material-ui/icons'
import { deepPurple, grey } from '@material-ui/core/colors'
import { createStructuredSelector } from 'reselect'
import { useSelector, useDispatch } from 'react-redux'
import { usePromiseTracker } from 'react-promise-tracker'

import ConfirmDialog from 'components/ConfirmDialog'
import { useInjectReducer } from 'store/configuration/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import { makeSelectUserEmail, makeSelectBackupText, makeSelectError } from './selectors'
import {
  getUserEmail,
  getBackupText,
  restoreAllOptions,
  changeBackupText,
  setBackupText,
} from './actions'
import reducer from './reducer'
import saga from './saga'

const CustomTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: deepPurple[300],
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: deepPurple[500],
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: deepPurple[500],
      },
      '&:hover fieldset': {
        borderColor: deepPurple[300],
      },
      '&.Mui-focused fieldset': {
        borderColor: deepPurple[500],
      },
    },
  },
})(TextField)

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
    fontSize: '14px',
  },
  infoSection: {
    borderBottom: `1px solid ${grey[500]}`,
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingBottom: '5px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '0.5rem',
  },
  plan: {
    fontWeight: '500',
  },
  email: {
    color: deepPurple[500],
  },
  restoreOptionsSection: {
    borderBottom: `1px solid ${grey[500]}`,
    paddingTop: '1.5rem',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingBottom: '1.5rem',
    margin: '0 auto',
    textAlign: 'center',
  },
  restoreAllOptionsButton: {
    color: deepPurple[500],
  },
  backupTextSection: {
    paddingTop: '1rem',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  backupTextTitle: {
    fontWeight: '500',
    marginBottom: '0.5rem',
  },
  helperText: {
    color: deepPurple[500],
    fontStyle: 'italic',
  },
  saveButtonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  saveButton: {
    color: deepPurple[500],
  },
}))

const key = 'settings'

const stateSelector = createStructuredSelector({
  userEmail: makeSelectUserEmail(),
  backupText: makeSelectBackupText(),
  error: makeSelectError(),
})

const Settings = () => {
  useInjectReducer({ key, reducer })
  useInjectSaga({ key, saga })

  const classes = useStyles()

  const { userEmail, backupText } = useSelector(stateSelector)
  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch()

  const { promiseInProgress } = usePromiseTracker()

  const handleGetUserEmail = () => {
    dispatch(getUserEmail())
  }

  const handleGetBackupText = () => {
    dispatch(getBackupText())
  }

  const handleChangeBackupText = event => {
    dispatch(changeBackupText(event.target.value))
  }

  const handleOpenConfirmDialog = () => {
    setIsOpen(true)
  }

  const handleCloseConfirmDialog = () => {
    setIsOpen(false)
  }

  const handleRestoreAllOptions = () => {
    dispatch(restoreAllOptions())
  }

  const handleSetBackupText = () => {
    dispatch(setBackupText(backupText))
  }

  /**
   * Get user email
   */
  useEffect(() => {
    handleGetUserEmail()
    handleGetBackupText()
  }, [])

  return (
    <div className={classes.root}>
      {userEmail === null || backupText === null || promiseInProgress ? (
        <CircularProgress />
      ) : (
        <div className={classes.wrapper}>
          <div className={classes.infoSection}>
            <div className={clsx(classes.row, classes.plan)}>
              <div>Plan:</div>
              <div>Free</div>
            </div>

            <div className={clsx(classes.row, classes.email)}>
              <div>Email:</div>
              <div>{userEmail}</div>
            </div>
          </div>

          <div className={classes.restoreOptionsSection}>
            <Button
              variant="outlined"
              className={classes.restoreAllOptionsButton}
              aria-label="restore"
              startIcon={<Restore />}
              onClick={handleOpenConfirmDialog}
              disabled={promiseInProgress}
            >
              Restore All Options
            </Button>
            <ConfirmDialog
              title="Restore All Options?"
              content={`This will restore all options belong to all questions that you configured with ${process.env.ADDON_NAME}. Are you sure?`}
              isOpen={isOpen}
              handleCancel={handleCloseConfirmDialog}
              handleOK={() => {
                handleRestoreAllOptions()
                handleCloseConfirmDialog()
              }}
            />
          </div>

          <div className={classes.backupTextSection}>
            <div className={clsx(classes.row, classes.backupTextTitle)}>Backup Text:</div>

            <div className={classes.row}>
              <CustomTextField
                id="backup-text"
                variant="outlined"
                label="Enter the text here"
                helperText="This is the option will appear after all available options are removed"
                FormHelperTextProps={{ classes: { root: classes.helperText } }}
                value={backupText}
                onChange={handleChangeBackupText}
              />
            </div>

            <div className={clsx(classes.row, classes.saveButtonWrapper)}>
              <Button
                variant="outlined"
                className={classes.saveButton}
                aria-label="save"
                startIcon={<SaveOutlined />}
                onClick={handleSetBackupText}
                disabled={backupText.length === 0 || promiseInProgress}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings
