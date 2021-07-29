import { shallow } from 'enzyme';
import FormInput, { Props } from './FormInput';

const props: Props = {
  name: 'string',
  placeholder: 'string',
  text: 'string',
  calculatorHandler: (x: any) => { },
}

describe('FormInput Component', () => {
  it('renders <FormInput /> component', () => {
    const wrapper = shallow(<FormInput {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});