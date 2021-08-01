import { calculatorReducer } from './';
import { StateTypes } from '../types';

const mockInitialState: StateTypes = {
  amount: 0,
  duration: 0,
  revolvingCredit: { value: 0, name: 'revolvingCredit' },
  buninessCredit: { value: 0, name: 'buninessCredit' },
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

  it('should return updating buninessCredit state', () => {
    const testState = calculatorReducer(mockInitialState, { type: 'buninessCredit', payload: { buninessCredit: { name: 'buninessCredit', value: 10 } } });
    expect(testState).toEqual({
      ...mockInitialState, buninessCredit: {
        name: 'buninessCredit', value: {
          buninessCredit: { name: 'buninessCredit', value: 10 }
        }
      }
    });
  });
});
