import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { shallow } from 'enzyme';
import CalculatorPage from './CalculatorPage';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

const mockUseSelectorProps = {
  revolvingCredit: {
    value: 1,
    name: 'revolvingCredit'
  },
  buninessCredit: {
    value: 1,
    name: 'buninessCredit'
  },
  amount: 10000,
  duration: 6
}

describe('Calculator Page Component', () => {

  beforeEach(() => {
    (useDispatch as jest.Mock).mockImplementation(() => mockDispatch);
    (useSelector as jest.Mock).mockImplementation(f => f(mockUseSelectorProps));
    jest.clearAllMocks();
  });

  it('renders <CalculatorPage /> component', () => {
    const wrapper = shallow(<CalculatorPage />);
    expect(wrapper).toMatchSnapshot();
  });

  it('to have been call dispatch', () => {
    const wrapper = shallow(<CalculatorPage />);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});