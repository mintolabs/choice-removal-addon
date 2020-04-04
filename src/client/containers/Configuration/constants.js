/*
 * Sample Constant
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const GET_CURRENT_USER = 'choice-removal/Configuration/GET_CURRENT_USER'
export const GET_CURRENT_USER_SUCCESS = 'choice-removal/Configuration/GET_CURRENT_USER_SUCCESS'
export const GET_CURRENT_USER_ERROR = 'choice-removal/Configuration/GET_CURRENT_USER_ERROR'

export const GET_SUPPORTED_FORM_QUESTIONS =
  'choice-removal/Configuration/GET_SUPPORTED_FORM_QUESTIONS'
export const GET_SUPPORTED_FORM_QUESTIONS_SUCCESS =
  'choice-removal/Configuration/GET_SUPPORTED_FORM_QUESTIONS_SUCCESS'
export const GET_SUPPORTED_FORM_QUESTIONS_ERROR =
  'choice-removal/Configuration/GET_SUPPORTED_FORM_QUESTIONS_ERROR'

export const GET_CONFIGURATION = 'choice-removal/Configuration/GET_CONFIGURATION'
export const GET_CONFIGURATION_SUCCESS = 'choice-removal/Configuration/GET_CONFIGURATION_SUCCESS'
export const GET_CONFIGURATION_ERROR = 'choice-removal/Configuration/GET_CONFIGURATION_ERROR'

export const UPDATE_CONFIGURATION = 'choice-removal/Configuration/UPDATE_CONFIGURATION'
export const UPDATE_CONFIGURATION_SUCCESS =
  'choice-removal/Configuration/UPDATE_CONFIGURATION_SUCCESS'
export const UPDATE_CONFIGURATION_ERROR = 'choice-removal/Configuration/UPDATE_CONFIGURATION_ERROR'
