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

import { GET_USER_EMAIL, GET_USER_EMAIL_SUCCESS, GET_USER_EMAIL_ERROR } from './constants'

export const getUserEmail = () => ({
  type: GET_USER_EMAIL,
})

export const getUserEmailSuccess = data => ({
  type: GET_USER_EMAIL_SUCCESS,
  payload: {
    data,
  },
})

export const getUserEmailError = err => ({
  type: GET_USER_EMAIL_ERROR,
  payload: {
    error: err,
  },
})
