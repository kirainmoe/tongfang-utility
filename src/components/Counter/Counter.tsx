import { decreaseAsync, decreaseCounter, increaseAsync, increaseCounter } from "actions/counter";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "stores";

import { CounterActions, CounterContainer, CounterNumber, ActionButton } from "./style";

export default function Counter() {
  const { count } = useSelector((state: AppState) => state.app);
  const dispatch = useDispatch();

  const increase = () => dispatch(increaseCounter());
  const decrease = () => dispatch(decreaseCounter());
  const delayIncrease = () => dispatch(increaseAsync());
  const delayDecrease = () => dispatch(decreaseAsync());

  return (
    <CounterContainer>
      <CounterNumber>Count: {count}</CounterNumber>
      <CounterActions>
        <ActionButton onClick={increase}>Increase</ActionButton>
        <ActionButton onClick={decrease}>Decrease</ActionButton>
        <ActionButton onClick={delayIncrease}>Increase (async)</ActionButton>
        <ActionButton onClick={delayDecrease}>Decrease (async)</ActionButton>
      </CounterActions>
    </CounterContainer>
  );
}
