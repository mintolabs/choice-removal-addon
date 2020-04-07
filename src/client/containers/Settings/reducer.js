import produce from 'immer'

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

export const initialState = {
  userEmail: '',
  backupText: '',
  error: null,
}

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_USER_EMAIL:
        draft.userEmail = initialState.userEmail
        draft.error = initialState.error
        break

      case GET_USER_EMAIL_SUCCESS:
        draft.userEmail = action.payload.data
        draft.error = initialState.error
        break

      case GET_USER_EMAIL_ERROR:
        draft.userEmail = initialState.userEmail
        draft.error = action.payload.error
        break

      case GET_BACKUP_TEXT:
        draft.backupText = initialState.backupText
        draft.error = initialState.error
        break

      case GET_BACKUP_TEXT_SUCCESS:
        draft.backupText = action.payload.data ? action.payload.data : initialState.backupText
        draft.error = initialState.error
        break

      case GET_BACKUP_TEXT_ERROR:
        draft.backupText = initialState.backupText
        draft.error = action.payload.error
        break

      case CHANGE_BACKUP_TEXT:
        draft.backupText = action.payload.value
        break

      case SET_BACKUP_TEXT:
        draft.error = initialState.error
        break

      case SET_BACKUP_TEXT_SUCCESS:
        draft.error = initialState.error
        break

      case SET_BACKUP_TEXT_ERROR:
        draft.backupText = initialState.backupText
        draft.error = action.payload.error
        break
    }
  })

export default reducer
