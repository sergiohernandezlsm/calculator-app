import { shallow } from 'enzyme';
import ProductForm from './ProductForm';

describe('ProductForm Component', () => {
  it('renders <ProductForm /> component', () => {
    const wrapper = shallow(<ProductForm />);
    expect(wrapper).toMatchSnapshot();
  });
});