import { all, call, put, takeLatest } from 'redux-saga/effects'

import serverMethods from 'utils/serverMethods'
import { promiseTrackerWrapped } from 'utils/promiseTracker'
import { GET_USER_EMAIL, GET_BACKUP_TEXT, SET_BACKUP_TEXT, RESTORE_ALL_OPTIONS } from './constants'
import {
  getUserEmailSuccess,
  getUserEmailError,
  getBackupTextSuccess,
  getBackupTextError,
  setBackupTextSuccess,
  setBackupTextError,
  restoreAllOptionsSuccess,
  restoreAllOptionsError,
} from './actions'

function* getUserEmailSaga() {
  const { getUserEmail } = serverMethods

  try {
    const currentUserData = yield call(promiseTrackerWrapped, getUserEmail)
    yield put(getUserEmailSuccess(currentUserData))
  } catch (err) {
    yield put(getUserEmailError(err))
  }
}

function* watchGetUserEmail() {
  // Watches for GET_USER_EMAIL actions and calls getUserEmailSaga when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_USER_EMAIL, getUserEmailSaga)
}

function* getBackupTextSaga() {
  const { getBackupText } = serverMethods

  try {
    const data = yield call(promiseTrackerWrapped, getBackupText)
    yield put(getBackupTextSuccess(data))
  } catch (err) {
    yield put(getBackupTextError(err))
  }
}

function* watchGetBackupText() {
  // Watches for GET_BACKUP_TEXT actions and calls getBackupTextSaga when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_BACKUP_TEXT, getBackupTextSaga)
}

function* setBackupTextSaga(action) {
  const { setBackupText } = serverMethods
  const { value } = action.payload

  try {
    const data = yield call(promiseTrackerWrapped, setBackupText, value)
    yield put(setBackupTextSuccess(data))
  } catch (err) {
    yield put(setBackupTextError(err))
  }
}

function* watchSetBackupText() {
  // Watches for SET_BACKUP_TEXT actions and calls setBackupTextSaga when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(SET_BACKUP_TEXT, setBackupTextSaga)
}

function* restoreAllOptionsSaga() {
  const { restoreAllOptions } = serverMethods

  try {
    yield call(promiseTrackerWrapped, restoreAllOptions)
    yield put(restoreAllOptionsSuccess())
  } catch (err) {
    yield put(restoreAllOptionsError(err))
  }
}

function* watchRestoreAllOptions() {
  // Watches for RESTORE_ALL_OPTIONS actions and calls restoreAllOptionsSaga when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(RESTORE_ALL_OPTIONS, restoreAllOptionsSaga)
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetUserEmail(),
    watchGetBackupText(),
    watchSetBackupText(),
    watchRestoreAllOptions(),
  ])
}
