import { shallow } from 'enzyme';
import { calculatorReducer, initialState } from './';

const mockPayload = 10;

const mockAction = {
  type: 'amount', payload: mockPayload
}

describe('testing store', () => {
  it('calculatorReducer should be true', () => {
    calculatorReducer(initialState, mockAction);
    // expect(mockPayload).toBeCalled();
  });
});