import {shallowMount} from '@vue/test-utils';
import flushPromises from 'flush-promises';
import Home from '../Home.vue';

describe('Home', () => {
  let wrapper;
  const $router = {push: jest.fn()};

  beforeEach(() => {
    wrapper = shallowMount(Home, {
      mocks: {$router}
    });
  });

  describe('when loaded', () => {
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('redirects to units on action button click', async () => {
      // when user is logged in
      wrapper.vm.$data.authenticated = true;

      await wrapper.find('.home__main__intro__button').trigger('click');

      await flushPromises();

      expect($router.push).toHaveBeenCalledWith('/units');
    });

    it('redirects to units with params on action button click', async () => {
      // when user is not logged in
      wrapper.vm.$data.authenticated = false;

      await wrapper.find('.home__main__intro__button').trigger('click');

      await flushPromises();

      expect($router.push).toHaveBeenCalledWith({name: 'login', query: {redirect: '/units'}});
    });
  });
});
