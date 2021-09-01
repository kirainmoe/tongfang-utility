import { DECREASE_COUNTER, INCREASE_COUNTER } from "common/constants/action-type";

export interface AppReducerState {
  count: number;
}

const initialState = {
  count: 0,
};

export default function appReducer(state: AppReducerState = initialState, action: any) {
  switch (action.type) {
    case INCREASE_COUNTER:
      return {
        ...state,
        count: state.count + 1,
      };

    case DECREASE_COUNTER:
      return {
        ...state,
        count: state.count - 1,
      };
    
    default:
      return state;
  }
}