/**
 * Global Selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectGlobal = state => state.global || initialState

const makeSelectError = () => createSelector(selectGlobal, globalState => globalState.error)

const makeSelectSupportedQuestions = () =>
  createSelector(selectGlobal, globalState => globalState.selectedQuestions)

export { selectGlobal, makeSelectError, makeSelectSupportedQuestions }
