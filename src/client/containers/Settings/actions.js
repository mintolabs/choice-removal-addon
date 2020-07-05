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
  GET_USER_EMAIL,
  GET_USER_EMAIL_SUCCESS,
  GET_USER_EMAIL_ERROR,
  GET_BACKUP_TEXT,
  GET_BACKUP_TEXT_SUCCESS,
  GET_BACKUP_TEXT_ERROR,
  CHANGE_BACKUP_TEXT,
  SET_BACKUP_TEXT,
  SET_BACKUP_TEXT_SUCCESS,
  SET_BACKUP_TEXT_ERROR,
} from './constants'

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

export const getBackupText = () => ({
  type: GET_BACKUP_TEXT,
})

export const getBackupTextSuccess = data => ({
  type: GET_BACKUP_TEXT_SUCCESS,
  payload: {
    data,
  },
})

export const getBackupTextError = err => ({
  type: GET_BACKUP_TEXT_ERROR,
  payload: {
    error: err,
  },
})

export const changeBackupText = value => ({
  type: CHANGE_BACKUP_TEXT,
  payload: {
    value,
  },
})

export const setBackupText = value => ({
  type: SET_BACKUP_TEXT,
  payload: {
    value,
  },
})

export const setBackupTextSuccess = data => ({
  type: SET_BACKUP_TEXT_SUCCESS,
  payload: {
    data,
  },
})

export const setBackupTextError = err => ({
  type: SET_BACKUP_TEXT_ERROR,
  payload: {
    error: err,
  },
})
