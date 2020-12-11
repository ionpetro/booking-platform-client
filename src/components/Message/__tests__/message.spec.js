import {mount} from '@vue/test-utils';
import Message from '../Message.vue';

describe('Message', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Message, {
      propsData: {
        type: 'error'
      }
    });
  });

  describe('when loaded', () => {
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
