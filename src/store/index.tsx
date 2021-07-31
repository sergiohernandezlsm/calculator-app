import { Action } from 'redux';
import { createStore } from 'redux';
import { StateTypes } from '../types';

export const initialState: StateTypes = {
  amount: 0,
  duration: 0,
  revolvingCredit: { value: 0, name: 'revolvingCredit' },
  buninessCredit: { value: 0, name: 'buninessCredit' }
};

export const calculatorReducer = (state: StateTypes = initialState, action: Action | any): StateTypes => {
  console.log('test', action.type);
  if (action.type === 'amount') {
    console.log('action.payload => ', action.payload)
    console.log('state => ', state)
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
      revolvingCredit: {
        value: action.payload,
        name: 'revolvingCredit'
      },
    };
  }
  if (action.type === 'buninessCredit') {
    return {
      ...state,
      buninessCredit: {
        value: action.payload,
        name: 'buninessCredit'
      },
    };
  }
  return state;
};

const store = createStore(calculatorReducer);

export default store;