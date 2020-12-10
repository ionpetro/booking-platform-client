import {mount} from '@vue/test-utils';
import Input from '../Input.vue';

describe('Input', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Input, {
      propsData: {
        type: 'text'
      }
    });
  });

  describe('when loaded', () => {
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
