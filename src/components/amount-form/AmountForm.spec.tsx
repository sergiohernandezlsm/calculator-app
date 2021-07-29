import { shallow } from 'enzyme';
import AmountForm from './AmountForm';

describe('AmountForm Component', () => {
  it('renders <AmountForm /> component', () => {
    const wrapper = shallow(<AmountForm />);
    expect(wrapper).toMatchSnapshot();
  });
});