import produce from 'immer'

import {
  RESTORE_ALL_OPTIONS,
  RESTORE_ALL_OPTIONS_SUCCESS,
  RESTORE_ALL_OPTIONS_ERROR,
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
      case RESTORE_ALL_OPTIONS:
        draft.error = initialState.error
        break

      case RESTORE_ALL_OPTIONS_SUCCESS:
        draft.error = initialState.error
        break

      case RESTORE_ALL_OPTIONS_ERROR:
        draft.error = action.payload.error
        break
    }
  })

export default reducer
