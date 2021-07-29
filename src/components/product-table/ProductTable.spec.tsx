import { shallow } from 'enzyme';
import ProductTable, { Props } from './ProductTable';

const props: Props = {
  title: 'test title'
}

describe('ProductTable Component', () => {
  it('renders <ProductTable /> component', () => {
    const wrapper = shallow(<ProductTable {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});