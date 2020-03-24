/*
 * Sample Actions
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

export const getSupportedFormQuestions = () => ({
  type: GET_SUPPORTED_FORM_QUESTIONS,
})

export const getSupportedFormQuestionsSuccess = data => ({
  type: GET_SUPPORTED_FORM_QUESTIONS_SUCCESS,
  payload: {
    data,
  },
})

export const getSupportedFormQuestionsError = err => ({
  type: GET_SUPPORTED_FORM_QUESTIONS_ERROR,
  payload: {
    error: err,
  },
})

export const getConfiguration = () => ({
  type: GET_CONFIGURATION,
})

export const getConfigurationSuccess = data => ({
  type: GET_CONFIGURATION_SUCCESS,
  payload: {
    data,
  },
})

export const getConfigurationError = err => ({
  type: GET_CONFIGURATION_ERROR,
  payload: {
    error: err,
  },
})

export const updateConfiguration = (questionId, checked) => ({
  type: UPDATE_CONFIGURATION,
  payload: {
    questionId,
    checked,
  },
})

export const updateConfigurationSuccess = data => ({
  type: UPDATE_CONFIGURATION_SUCCESS,
  payload: {
    data,
  },
})

export const updateConfigurationError = err => ({
  type: UPDATE_CONFIGURATION_ERROR,
  payload: {
    error: err,
  },
})
