import { Dispatch } from 'redux';
import { ProductTypes, FieldTypes } from '../types';

export const setAmount = (dispatch: Dispatch, data: number) => {
  dispatch({ type: 'amount', payload: data });
};

export const setDuration = (dispatch: Dispatch, data: number) => {
  dispatch({ type: 'duration', payload: data });
};

export const setRevolving = (dispatch: Dispatch, data: number) => {
  dispatch({ type: 'revolvingCredit', payload: data });
};

export const setBusiness = (dispatch: Dispatch, data: number) => {
  dispatch({ type: 'businessCredit', payload: data });
};

export const setCreditsData = (dispatch: Dispatch, data: ProductTypes[]) => {
  dispatch({ type: 'creditsData', payload: data });
};

export const setRequestForm = (dispatch: Dispatch, data: FieldTypes[]) => {
  dispatch({ type: 'requestForm', payload: data });
};

export const setPrincipal = (dispatch: Dispatch, data: number) => {
  dispatch({ type: 'principal', payload: data });
};
