import { Action } from 'redux';
import { createStore } from 'redux';
import { StateTypes } from '../types';

const initialState: StateTypes = {
  credits: [],
  requestForm: [],
  amount: 0,
  duration: 0,
  revolvingCredit: { value: 0, name: 'revolvingCredit' },
  businessCredit: { value: 0, name: 'businessCredit' }
};

export const calculatorReducer = (state: StateTypes = initialState, action: Action | any): StateTypes => {
  if (action.type === 'creditsData') {
    return {
      ...state,
      credits: action.payload,
    };
  }
  if (action.type === 'requestForm') {
    return {
      ...state,
      requestForm: action.payload,
    };
  }
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
      revolvingCredit: {
        value: action.payload,
        name: 'revolvingCredit'
      },
    };
  }
  if (action.type === 'businessCredit') {
    return {
      ...state,
      businessCredit: {
        value: action.payload,
        name: 'businessCredit'
      },
    };
  }
  return state;
};

const store = createStore(calculatorReducer);

export default store;