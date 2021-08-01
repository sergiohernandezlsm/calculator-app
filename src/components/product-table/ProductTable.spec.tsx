import { shallow } from 'enzyme';
import ProductTable, { Props } from './ProductTable';
import faker from 'faker';

const mockInputOnChangeHandler = jest.fn();
const props: Props = {
  title: faker.lorem.word(),
  id: 1,
  productField: {
    name: "revolvingCredit",
    placeholder: "Enter Rate",
    text: "(%)",
    label: "Interest rate"
  },
  productData: [
    {
      paymentDate: '01/09/2021',
      principal: 2500,
      interest: 3,
      totalRepayment: 2800
    }
  ],
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