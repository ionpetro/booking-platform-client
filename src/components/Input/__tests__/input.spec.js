import {shallowMount} from '@vue/test-utils';
import Input from '../Input.vue';

describe('Input', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Input, {
      propsData: {
        type: 'text',
        name: 'password'
      }
    });
  });

  describe('when loaded', () => {
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('shows password on icon click', async () => {
      wrapper = shallowMount(Input, {
        propsData: {
          type: 'password',
          name: 'password'
        }
      });
      expect(wrapper.vm.$data.customType).toEqual('password');
      expect(wrapper.vm.$data.showEye).toBeTruthy();

      await wrapper.find('.input__icon').trigger('click');
      expect(wrapper.vm.$data.customType).toEqual('text');
      expect(wrapper.vm.$data.showEye).toBeFalsy();
    });

    it('hides password on icon click', async () => {
      wrapper = shallowMount(Input, {
        propsData: {
          type: 'password',
          name: 'password'
        }
      });

      // turn password field to text
      wrapper.vm.$data.customType = 'text';
      wrapper.vm.$data.showEye = false;

      await wrapper.find('.input__icon').trigger('click');
      expect(wrapper.vm.$data.customType).toEqual('password');
      expect(wrapper.vm.$data.showEye).toBeTruthy();
    });
    it('does not change input type when its text input', () => {
      wrapper = shallowMount(Input, {
        propsData: {
          type: 'text',
          name: 'text'
        }
      });
      wrapper.vm.showPassword();
      expect(wrapper.vm.$data.customType).toEqual('text');
    });
  });
});
