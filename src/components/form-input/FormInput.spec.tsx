import { shallow } from 'enzyme';
import FormInput, { Props } from './FormInput';
import faker from 'faker';

const mockInputOnChangeHandler = jest.fn();

const props: Props = {
  name: 'inputName',
  placeholder: faker.lorem.word(),
  text: faker.lorem.word(),
  label: faker.lorem.word(),
  inputOnChangeHandler: mockInputOnChangeHandler,
}

describe('FormInput Component', () => {
  it('renders <FormInput /> component', () => {
    const wrapper = shallow(<FormInput {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should get value onChange', () => {
    const wrapper = shallow(<FormInput {...props} />);
    const input = wrapper.find('.inputStyles');
    input.simulate('change', { value: 50 });
    expect(input.length).toBe(1);
    expect(mockInputOnChangeHandler).toHaveBeenCalled();
    expect(mockInputOnChangeHandler).toHaveBeenCalledWith({ value: 50 });
  });
});