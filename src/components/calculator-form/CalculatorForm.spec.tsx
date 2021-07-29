import { shallow } from 'enzyme';
import CalculatorForm, { Props } from './CalculatorForm';

const props: Props = {
  calculatorHandler: (x: any) => { },
  formField: [],
}

describe('CalculatorForm Component', () => {
  it('renders <CalculatorForm /> component', () => {
    const wrapper = shallow(<CalculatorForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});