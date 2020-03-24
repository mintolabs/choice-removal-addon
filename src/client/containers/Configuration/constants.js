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

export const GET_SUPPORTED_FORM_QUESTIONS = 'yace/Configuration/GET_SUPPORTED_FORM_QUESTIONS'
export const GET_SUPPORTED_FORM_QUESTIONS_SUCCESS =
  'yace/Configuration/GET_SUPPORTED_FORM_QUESTIONS_SUCCESS'
export const GET_SUPPORTED_FORM_QUESTIONS_ERROR =
  'yace/Configuration/GET_SUPPORTED_FORM_QUESTIONS_ERROR'

export const GET_CONFIGURATION = 'yace/Configuration/GET_CONFIGURATION'
export const GET_CONFIGURATION_SUCCESS = 'yace/Configuration/GET_CONFIGURATION_SUCCESS'
export const GET_CONFIGURATION_ERROR = 'yace/Configuration/GET_CONFIGURATION_ERROR'

export const UPDATE_CONFIGURATION = 'yace/Configuration/UPDATE_CONFIGURATION'
export const UPDATE_CONFIGURATION_SUCCESS = 'yace/Configuration/UPDATE_CONFIGURATION_SUCCESS'
export const UPDATE_CONFIGURATION_ERROR = 'yace/Configuration/UPDATE_CONFIGURATION_ERROR'
