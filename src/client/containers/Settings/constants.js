/*
 * Settings Constant
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const GET_USER_EMAIL = 'choice-removal/Settings/GET_USER_EMAIL'
export const GET_USER_EMAIL_SUCCESS = 'choice-removal/Settings/GET_USER_EMAIL_SUCCESS'
export const GET_USER_EMAIL_ERROR = 'choice-removal/Settings/GET_USER_EMAIL_ERROR'

export const GET_BACKUP_TEXT = 'choice-removal/Settings/GET_BACKUP_TEXT'
export const GET_BACKUP_TEXT_SUCCESS = 'choice-removal/Settings/GET_BACKUP_TEXT_SUCCESS'
export const GET_BACKUP_TEXT_ERROR = 'choice-removal/Settings/GET_BACKUP_TEXT_ERROR'

export const CHANGE_BACKUP_TEXT = 'choice-removal/Settings/CHANGE_BACKUP_TEXT'

export const SET_BACKUP_TEXT = 'choice-removal/Settings/SET_BACKUP_TEXT'
export const SET_BACKUP_TEXT_SUCCESS = 'choice-removal/Settings/SET_BACKUP_TEXT_SUCCESS'
export const SET_BACKUP_TEXT_ERROR = 'choice-removal/Settings/SET_BACKUP_TEXT_ERROR'
