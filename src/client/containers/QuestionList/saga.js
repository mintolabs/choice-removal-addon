import { all, call, put, takeLatest } from 'redux-saga/effects'

import serverMethods from 'utils/serverMethods'
import { promiseTrackerWrapped } from 'utils/promiseTracker'
import {
  GET_CURRENT_USER,
  GET_SUPPORTED_FORM_QUESTIONS,
  GET_CONFIGURATION,
  UPDATE_CONFIGURATION,
} from 'containers/Configuration/constants'
import {
  getCurrentUserSuccess,
  getCurrentUserError,
  getSupportedFormQuestionsSuccess,
  getSupportedFormQuestionsError,
  getConfigurationSuccess,
  getConfigurationError,
  updateConfigurationSuccess,
  updateConfigurationError,
} from 'containers/Configuration/actions'

function* getCurrentUserSaga() {
  const { getCurrentUser, createUser } = serverMethods

  try {
    const currentUserData = yield call(promiseTrackerWrapped, getCurrentUser)
    yield put(getCurrentUserSuccess(currentUserData))
  } catch (err) {
    try {
      // User does not exist, create new default user
      yield call(promiseTrackerWrapped, createUser)
      yield put(getCurrentUserSuccess())
    } catch (createUserErr) {
      yield put(getCurrentUserError(createUserErr))
    }
  }
}

function* watchGetCurrentUser() {
  // Watches for GET_CURRENT_USER actions and calls getCurrentUserSaga when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_CURRENT_USER, getCurrentUserSaga)
}

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

function* getConfigurationSaga() {
  try {
    const { getConfiguration } = serverMethods

    const configuration = yield call(promiseTrackerWrapped, getConfiguration)
    yield put(getConfigurationSuccess(configuration))
  } catch (err) {
    yield put(getConfigurationError(err))
  }
}

function* watchGetConfiguration() {
  // Watches for GET_CONFIGURATION actions and calls getConfigurationSaga when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_CONFIGURATION, getConfigurationSaga)
}

function* updateConfigurationSaga(action) {
  try {
    const { updateConfiguration } = serverMethods
    const { questionId, checked } = action.payload

    const updatedConfiguration = yield call(
      promiseTrackerWrapped,
      updateConfiguration,
      questionId,
      checked
    )
    yield put(updateConfigurationSuccess(updatedConfiguration))
  } catch (err) {
    yield put(updateConfigurationError(err))
  }
}

function* watchUpdateConfiguration() {
  // Watches for UPDATE_CONFIGURATION actions and calls updateConfigurationSaga when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(UPDATE_CONFIGURATION, updateConfigurationSaga)
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetCurrentUser(),
    watchGetSupportedFormQuestions(),
    watchGetConfiguration(),
    watchUpdateConfiguration(),
  ])
}
