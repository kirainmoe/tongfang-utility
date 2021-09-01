import { call, put, takeEvery } from 'redux-saga/effects';

import { decreaseCounter, increaseCounter } from 'actions/counter';
import { DECREASE_ASYNC, INCREASE_ASYNC } from 'common/constants/action-type';

const pauseASecond = () => new Promise(resolve => setTimeout(() => resolve(null), 1000));

function* delayIncrease() {
  yield call(pauseASecond);
  yield put(increaseCounter());
}

function* delayDecrease() {
  yield call(pauseASecond);
  yield put(decreaseCounter());
}

export default function* counterSaga() {
  yield takeEvery(INCREASE_ASYNC, delayIncrease);
  yield takeEvery(DECREASE_ASYNC, delayDecrease);
}
