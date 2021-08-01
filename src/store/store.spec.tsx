import { calculatorReducer } from './';
import { StateTypes } from '../types';

const mockInitialState: StateTypes = {
  amount: 0,
  duration: 0,
  revolvingCredit: { value: 0, name: 'revolvingCredit' },
  businessCredit: { value: 0, name: 'businessCredit' },
  credits: [],
  requestForm: [],
};

describe('testing store', () => {
  it('should return DEFAULT state', () => {
    const testState = calculatorReducer(mockInitialState, { type: '' });
    expect(testState).toEqual(mockInitialState);
  });

  it('should return creditsData', () => {
    const testState = calculatorReducer(mockInitialState, { type: 'creditsData', payload: [] });
    expect(testState).toEqual({ ...mockInitialState, credits: [] });
  });

  it('should return requestForm', () => {
    const testState = calculatorReducer(mockInitialState, { type: 'requestForm', payload: [] });
    expect(testState).toEqual({ ...mockInitialState, requestForm: [] });
  });

  it('should return updating amount state', () => {
    const testState = calculatorReducer(mockInitialState, { type: 'amount', payload: 10 });
    expect(testState).toEqual({ ...mockInitialState, amount: 10 });
  });

  it('should return updating duration state', () => {
    const testState = calculatorReducer(mockInitialState, { type: 'duration', payload: 10 });
    expect(testState).toEqual({ ...mockInitialState, duration: 10 });
  });

  it('should return updating principal state', () => {
    const testState = calculatorReducer(mockInitialState, { type: 'principal', payload: 10 });
    expect(testState).toEqual({ ...mockInitialState, principal: 10 });
  });

  it('should return updating revolvingCredit state', () => {
    const testState = calculatorReducer(mockInitialState, { type: 'revolvingCredit', payload: { revolvingCredit: { name: 'revolvingCredit', value: 10 } } });
    expect(testState).toEqual({
      ...mockInitialState, revolvingCredit: {
        name: 'revolvingCredit', value: {
          revolvingCredit: { name: 'revolvingCredit', value: 10 }
        }
      }
    });
  });

  it('should return updating businessCredit state', () => {
    const testState = calculatorReducer(mockInitialState, { type: 'businessCredit', payload: { businessCredit: { name: 'businessCredit', value: 10 } } });
    expect(testState).toEqual({
      ...mockInitialState, businessCredit: {
        name: 'businessCredit', value: {
          businessCredit: { name: 'businessCredit', value: 10 }
        }
      }
    });
  });
});
