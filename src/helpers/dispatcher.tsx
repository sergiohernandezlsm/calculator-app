import { Dispatch } from 'redux';
import { ProductTypes, FieldTypes } from '../types';

export const dispatchValues = (e: React.ChangeEvent<HTMLInputElement> | null, reference: string, dispatch: Dispatch, data: (ProductTypes | FieldTypes)[] | number | null) => {
  if (e) {
    if (e.target.name === reference) {
      dispatch({ type: reference, payload: +e.target.value });
    }
  } else {
    dispatch({ type: reference, payload: data })
  }
}