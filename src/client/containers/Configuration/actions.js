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
