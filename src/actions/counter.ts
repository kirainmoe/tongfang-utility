import {
  DECREASE_ASYNC,
  DECREASE_COUNTER,
  INCREASE_ASYNC,
  INCREASE_COUNTER,
} from 'common/constants/action-type';

export const increaseCounter = () => ({
  type: INCREASE_COUNTER,
});

export const decreaseCounter = () => ({
  type: DECREASE_COUNTER,
});

export const increaseAsync = () => ({
  type: INCREASE_ASYNC,
});

export const decreaseAsync = () => ({
  type: DECREASE_ASYNC,
});
