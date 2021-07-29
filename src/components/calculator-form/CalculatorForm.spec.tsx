import { shallow } from 'enzyme';
import CalculatorForm from './CalculatorForm';

describe('CalculatorForm Component', () => {
  it('renders <CalculatorForm /> component', () => {
    const wrapper = shallow(<CalculatorForm />);
    expect(wrapper).toMatchSnapshot();
  });
});