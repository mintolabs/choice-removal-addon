/*
 * Settings Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  RESTORE_ALL_OPTIONS,
  RESTORE_ALL_OPTIONS_SUCCESS,
  RESTORE_ALL_OPTIONS_ERROR,
} from './constants'

export const restoreAllOptions = () => ({
  type: RESTORE_ALL_OPTIONS,
})

export const restoreAllOptionsSuccess = () => ({
  type: RESTORE_ALL_OPTIONS_SUCCESS,
})

export const restoreAllOptionsError = err => ({
  type: RESTORE_ALL_OPTIONS_ERROR,
  payload: {
    error: err,
  },
})
