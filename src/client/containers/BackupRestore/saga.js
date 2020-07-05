import { all, call, put, takeLatest } from 'redux-saga/effects'

import serverMethods from 'utils/serverMethods'
import { promiseTrackerWrapped } from 'utils/promiseTracker'
import { RESTORE_ALL_OPTIONS } from './constants'
import { restoreAllOptionsSuccess, restoreAllOptionsError } from './actions'

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
  yield all([watchRestoreAllOptions()])
}
