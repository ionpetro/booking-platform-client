import {shallowMount} from '@vue/test-utils';
import Drawer from '../Drawer.vue';

const mockSetVisibility = jest.fn();
mockSetVisibility.mockReturnValue(true);

const wrapper = shallowMount(Drawer, {
  methods: {
    setVisibility: mockSetVisibility
  }
});

describe('Drawer', () => {
  describe('when loaded', () => {
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
