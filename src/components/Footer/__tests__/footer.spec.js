import {mount} from '@vue/test-utils';
import Footer from '../Footer.vue';

describe('Footer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Footer);
  });

  describe('when loaded', () => {
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
