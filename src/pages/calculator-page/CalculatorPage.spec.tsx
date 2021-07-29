import { shallow } from 'enzyme';
import CalculatorPage from './CalculatorPage';

describe('Calculator Page Component', () => {

  it('renders <CalculatorPage /> component', () => {
    const wrapper = shallow(<CalculatorPage />);
    expect(wrapper).toMatchSnapshot();
  });
});