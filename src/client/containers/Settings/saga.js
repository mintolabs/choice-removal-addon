import { all, call, put, takeLatest } from 'redux-saga/effects'

import serverMethods from 'utils/serverMethods'
import { promiseTrackerWrapped } from 'utils/promiseTracker'
import { GET_USER_EMAIL } from './constants'
import { getUserEmailSuccess, getUserEmailError } from './actions'

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

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([watchGetUserEmail()])
}
