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
  businessCredit: {
    value: faker.datatype.number(),
    name: 'businessCredit'
  },
  amount: 10000,
  duration: 6,
  principal: 100,
  credits: [
    {
      title: faker.lorem.words(3),
      creditName: "revolvingCredit",
      formData: {}
    },
    {
      title: faker.lorem.words(3),
      creditName: "businessCredit",
      formData: {}
    }
  ],
  requestForm: [{
    name: "amount",
    placeholder: faker.lorem.word(),
    text: "(in £)",
    label: faker.lorem.word()
  },
  {
    name: "duration",
    placeholder: faker.lorem.word(),
    text: "(in months)",
    label: faker.lorem.word()
  },
  {
    name: "revolvingCredit",
    placeholder: faker.lorem.word(),
    text: "(in £)",
    label: faker.lorem.word()
  },
  {
    name: "businessCredit",
    placeholder: faker.lorem.word(),
    text: "(in £)",
    label: faker.lorem.word()
  }
  ]
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

  it('to have been call dispatch with "amount" value', () => {
    const wrapper = mount(<CalculatorPage />);
    const formInput = wrapper.find('[name="amount"]');
    const input = formInput.find('.inputStyles').at(0);
    input.simulate('change', 50);
    expect(mockDispatch).toHaveBeenCalledTimes(4);
  });

  it('to have been call dispatch with "duration" value', () => {
    const wrapper = mount(<CalculatorPage />);
    const formInput = wrapper.find('[name="duration"]');
    const input = formInput.find('.inputStyles').at(1);
    input.simulate('change', 50);
    expect(mockDispatch).toHaveBeenCalledTimes(4);
  });
  it('to have been call dispatch with "revolvingCredit" value', () => {
    const wrapper = mount(<CalculatorPage />);
    const formInput = wrapper.find('[name="revolvingCredit"]');
    const input = formInput.find('.inputStyles').at(0);
    input.simulate('change', 50);
    expect(mockDispatch).toHaveBeenCalledTimes(4);
  });
  it('to have been call dispatch with "businessCredit" value', () => {
    const wrapper = mount(<CalculatorPage />);
    const formInput = wrapper.find('[name="businessCredit"]');
    const input = formInput.find('.inputStyles').at(0);
    input.simulate('change', 50);
    expect(mockDispatch).toHaveBeenCalledTimes(4);
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