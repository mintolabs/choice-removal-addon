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
  GET_CURRENT_USER,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_ERROR,
  GET_SUPPORTED_FORM_QUESTIONS,
  GET_SUPPORTED_FORM_QUESTIONS_SUCCESS,
  GET_SUPPORTED_FORM_QUESTIONS_ERROR,
  GET_CONFIGURATION,
  GET_CONFIGURATION_SUCCESS,
  GET_CONFIGURATION_ERROR,
  UPDATE_CONFIGURATION,
  UPDATE_CONFIGURATION_SUCCESS,
  UPDATE_CONFIGURATION_ERROR,
} from './constants'

export const initialState = {
  supportedQuestions: [],
  configuration: null,
  error: null,
}

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_CURRENT_USER:
        draft.error = initialState.error
        break

      case GET_CURRENT_USER_SUCCESS:
        draft.error = initialState.error
        break

      case GET_CURRENT_USER_ERROR:
        draft.error = action.payload.error
        break

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

      case GET_CONFIGURATION:
        draft.error = initialState.error
        break

      case GET_CONFIGURATION_SUCCESS:
        draft.configuration = action.payload.data
        draft.error = initialState.error
        break

      case GET_CONFIGURATION_ERROR:
        draft.error = action.payload.error
        break

      case UPDATE_CONFIGURATION:
        draft.error = initialState.error
        break

      case UPDATE_CONFIGURATION_SUCCESS:
        draft.configuration = action.payload.data
        draft.error = initialState.error
        break

      case UPDATE_CONFIGURATION_ERROR:
        draft.error = action.payload.error
        break
    }
  })

export default reducer
