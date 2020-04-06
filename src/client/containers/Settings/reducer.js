import produce from 'immer'

import { GET_USER_EMAIL, GET_USER_EMAIL_SUCCESS, GET_USER_EMAIL_ERROR } from './constants'

export const initialState = {
  userEmail: '',
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
    }
  })

export default reducer
