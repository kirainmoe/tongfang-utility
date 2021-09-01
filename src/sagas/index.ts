import { all } from 'redux-saga/effects';

import counterSaga from './counterSaga';

export default function* rootSaga() {
  yield all([
    counterSaga(),
  ]);
}