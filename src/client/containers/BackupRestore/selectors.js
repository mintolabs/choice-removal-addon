/**
 * Settings Selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectSettings = state => state.settings || initialState

const makeSelectError = () => createSelector(selectSettings, settingsState => settingsState.error)

export { makeSelectError }
