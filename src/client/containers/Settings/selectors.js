/**
 * Settings Selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectSettings = state => state.settings || initialState

const makeSelectUserEmail = () =>
  createSelector(selectSettings, settingsState => settingsState.userEmail)

const makeSelectBackupText = () =>
  createSelector(selectSettings, settingsState => settingsState.backupText)

const makeSelectError = () => createSelector(selectSettings, settingsState => settingsState.error)

export { makeSelectUserEmail, makeSelectBackupText, makeSelectError }
