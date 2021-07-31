import { useSelector, useDispatch } from 'react-redux';
import { shallow, mount } from 'enzyme';
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
    const wrapper = mount(<CalculatorPage />);
    const formInput = wrapper.find('[name="amount"]');
    const input = formInput.find('.inputStyles').at(0);
    input.simulate('change', 50);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});