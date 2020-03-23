/*
 * Configuration Reducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer'

import {
  GET_SUPPORTED_FORM_QUESTIONS,
  GET_SUPPORTED_FORM_QUESTIONS_SUCCESS,
  GET_SUPPORTED_FORM_QUESTIONS_ERROR,
} from './constants'

export const initialState = {
  supportedQuestions: [],
  error: null,
}

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_SUPPORTED_FORM_QUESTIONS:
        draft.supportedQuestions = initialState.supportedQuestions
        draft.error = initialState.error
        break

      case GET_SUPPORTED_FORM_QUESTIONS_SUCCESS:
        draft.supportedQuestions = action.payload.data
        draft.error = initialState.error
        break

      case GET_SUPPORTED_FORM_QUESTIONS_ERROR:
        draft.error = action.payload.error
        break
    }
  })

export default reducer
