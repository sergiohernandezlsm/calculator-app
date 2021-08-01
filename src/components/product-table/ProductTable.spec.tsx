import { shallow } from 'enzyme';
import ProductTable, { Props } from './ProductTable';

const mockInputOnChangeHandler = jest.fn();
const props: Props = {
  title: 'test title',
  id: 1,
  productField: {
    name: 'string',
    placeholder: 'string',
    text: 'string',
    label: 'string',
    min: 1,
    max: 1,
  },
  productData: [],
  totalRow: {
    totalPrincipal: 1,
    totalInterest: 1,
    totalRepayment: 1,
  },
  inputOnChangeHandler: mockInputOnChangeHandler,
}

describe('ProductTable Component', () => {
  it('renders <ProductTable /> component', () => {
    const wrapper = shallow(<ProductTable {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});