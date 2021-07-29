import { shallow } from 'enzyme';
import ProductTable from './ProductTable';

describe('ProductTable Component', () => {
  it('renders <ProductTable /> component', () => {
    const wrapper = shallow(<ProductTable />);
    expect(wrapper).toMatchSnapshot();
  });
});