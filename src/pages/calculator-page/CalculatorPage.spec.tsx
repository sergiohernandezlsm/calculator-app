import { useSelector, useDispatch } from 'react-redux';
import { shallow, mount } from 'enzyme';
import CalculatorPage from './CalculatorPage';
import faker from 'faker';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

const mockDefaultData = {
  revolvingCredit: {
    value: faker.datatype.number(),
    name: 'revolvingCredit'
  },
  buninessCredit: {
    value: faker.datatype.number(),
    name: 'buninessCredit'
  },
  amount: 10000,
  duration: 6,
  credits: [
    {
      title: faker.lorem.words(3),
      creditName: "revolvingCredit",
      formData: {}
    },
    {
      title: faker.lorem.words(3),
      creditName: "buninessCredit",
      formData: {}
    }
  ],
  requestForm: [{
    name: "amount",
    placeholder: faker.lorem.word(),
    text: "(in £)",
    label: faker.lorem.word(),
    min: 0,
    max: 60000
  },
  {
    name: "duration",
    placeholder: faker.lorem.word(),
    text: "(in months)",
    label: faker.lorem.word(),
    min: 0,
    max: 60
  }]
}

describe('Calculator Page Component', () => {

  beforeEach(() => {
    (useDispatch as jest.Mock).mockImplementation(() => mockDispatch);
    (useSelector as jest.Mock).mockImplementation(f => f(mockDefaultData));
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
    expect(mockDispatch).toHaveBeenCalledTimes(5);
  });

  it('renders with defult data', () => {
    const mockNewData = {
      ...mockDefaultData,
      credits: [{}]
    };
    (useSelector as jest.Mock).mockImplementation(f => f(mockNewData));
    const wrapperWithoutCreditsData = shallow(<CalculatorPage />);
    expect(wrapperWithoutCreditsData).toMatchSnapshot();
  });
});