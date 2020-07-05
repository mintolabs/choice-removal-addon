import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { SettingsBackupRestore, Restore } from '@material-ui/icons'
import { deepPurple } from '@material-ui/core/colors'
import { useDispatch } from 'react-redux'
import { usePromiseTracker } from 'react-promise-tracker'

import LoadingIndicator from 'components/LoadingIndicator'
import ConfirmDialog from 'components/ConfirmDialog'
import { useInjectReducer } from 'store/configuration/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import { restoreAllOptions } from './actions'
import reducer from './reducer'
import saga from './saga'

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
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '0.5rem',
  },
  backupOptionsSection: {
    paddingTop: '1.5rem',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingBottom: '1.5rem',
    margin: '0 auto',
    textAlign: 'center',
  },
  backupOptionsButton: {
    color: deepPurple[500],
  },
  restoreOptionsSection: {
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
}))

const key = 'backup-restore'

const BackupRestore = () => {
  useInjectReducer({ key, reducer })
  useInjectSaga({ key, saga })

  const classes = useStyles()

  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch()

  const { promiseInProgress } = usePromiseTracker()

  const handleOpenConfirmDialog = () => {
    setIsOpen(true)
  }

  const handleCloseConfirmDialog = () => {
    setIsOpen(false)
  }

  const handleRestoreAllOptions = () => {
    dispatch(restoreAllOptions())
  }

  const showLoadingIndicator = promiseInProgress

  return (
    <div className={classes.root}>
      {showLoadingIndicator ? (
        <LoadingIndicator open={showLoadingIndicator} />
      ) : (
        <div className={classes.wrapper}>
          <div className={classes.backupOptionsSection}>
            <Button
              variant="outlined"
              className={classes.backupOptionsButton}
              aria-label="restore"
              startIcon={<SettingsBackupRestore />}
              onClick={handleOpenConfirmDialog}
              disabled={promiseInProgress}
            >
              Backup Options
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
        </div>
      )}
    </div>
  )
}

export default BackupRestore
