import {shallowMount, createLocalVue} from '@vue/test-utils';
import flushPromises from 'flush-promises';
import Navigation from '../Navigation.vue';
import AuthService from '../../../shared/services/auth.service';

import clickOutsideDirective from '../../../shared/helpers/directives/clickOutside';

describe('Navigation', () => {
  let wrapper;

  const logoutMock = jest.fn();
  AuthService.prototype.logout = logoutMock;

  const $router = {push: jest.fn()};

  beforeEach(() => {
    clickOutsideDirective();

    wrapper = shallowMount(Navigation, {
      stubs: ['router-link'],
      mocks: {$router}
    });
    // mount component and login a user
    wrapper.setData({user: {username: 'test', firstName: 'test', lastName: 'test'}});
  });

  describe('when loaded', () => {
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
    it('opens dropdown', async () => {
      await wrapper.find('.nav__login__dropdown__title').trigger('click');

      await flushPromises();

      expect(wrapper.vm.showDropDown).toBeTruthy();
    });

    it('opens navbar menu on mobile', async () => {
      await wrapper.find('.nav__icon').trigger('click');
      await flushPromises();

      expect(wrapper.vm.openMobileNav).toBeTruthy();
    });

    it('logs user out when logout is clicked', async () => {
      // open dropdown
      await wrapper.setData({showDropDown: true});

      console.log(wrapper.vm.showDropDown);

      // close dropdown on click out

      await wrapper.find('.nav__login__dropdown__body').trigger('click');
      expect(AuthService.prototype.logout).toHaveBeenCalledTimes(1);
      expect($router.push).toHaveBeenCalledWith('/login');
    });

    it('adds class on scroll', async () => {
      const localVue = createLocalVue();
      wrapper = shallowMount(Navigation, {
        localVue,
        attachToDocument: true
      });

      await window.dispatchEvent(new CustomEvent('scroll'));
      expect(wrapper.vm.scrollPosition).toEqual(0);
    });
  });
});
