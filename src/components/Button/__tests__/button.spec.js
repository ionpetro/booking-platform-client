import {mount} from '@vue/test-utils';
import Button from '../Button.vue';

describe('Button', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Button);
  });

  describe('when loaded', () => {
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
