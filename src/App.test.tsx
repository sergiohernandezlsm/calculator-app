import { shallow } from 'enzyme';
import App from './App';

test('renders react App component', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});
