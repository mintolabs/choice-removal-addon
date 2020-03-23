import { all, call, put, takeLatest } from 'redux-saga/effects'

import serverMethods from 'utils/serverMethods'
import { promiseTrackerWrapped } from 'utils/promiseTracker'
import { GET_SUPPORTED_FORM_QUESTIONS } from './constants'
import { getSupportedFormQuestionsSuccess, getSupportedFormQuestionsError } from './actions'

function* getSupportedFormQuestionsSaga() {
  try {
    const { getSupportedFormQuestions } = serverMethods

    const supportedFormQuestions = yield call(promiseTrackerWrapped, getSupportedFormQuestions)
    yield put(getSupportedFormQuestionsSuccess(supportedFormQuestions))
  } catch (err) {
    yield put(getSupportedFormQuestionsError(err))
  }
}

function* watchGetSupportedFormQuestions() {
  // Watches for GET_SUPPORTED_FORM_QUESTIONS actions and calls getSupportedFormQuestionsSaga when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_SUPPORTED_FORM_QUESTIONS, getSupportedFormQuestionsSaga)
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([watchGetSupportedFormQuestions()])
}
