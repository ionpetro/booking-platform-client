import {shallowMount} from '@vue/test-utils';
import Drawer from '../Drawer.vue';

const wrapper = shallowMount(Drawer, {
  methods: {
    open: jest.fn(),
    addOnKeyPressListener: jest.fn(),
    addOnClickListener: jest.fn()
  }
});

describe('Drawer', () => {
  describe('when loaded', () => {
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
