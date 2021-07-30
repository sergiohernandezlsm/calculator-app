import { Action } from 'redux';
import { createStore } from 'redux';
import { StateTypes } from '../types';

const initialState: StateTypes = { amount: 0, duration: 0, revolvingCredit: 0, buninessCredit: 0 };

const calculatorReducer = (state: StateTypes = initialState, action: Action | any): StateTypes => {
  if (action.type === 'amount') {
    return {
      ...state,
      amount: action.payload,
    };
  }
  if (action.type === 'duration') {
    return {
      ...state,
      duration: action.payload,
    };
  }
  if (action.type === 'revolvingCredit') {
    return {
      ...state,
      revolvingCredit: action.payload,
    };
  }
  if (action.type === 'buninessCredit') {
    return {
      ...state,
      buninessCredit: action.payload,
    };
  }
  return state;
};

const store = createStore(calculatorReducer);

export default store;