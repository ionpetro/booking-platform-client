import {shallowMount} from '@vue/test-utils';
import flushPromises from 'flush-promises';
import Login from '../Login.vue';
// import authService from '../src/shared/services/auth.service';

// jest.mock('../src/shared/services/auth.service');

describe('Login', () => {
  let wrapper;
  const $router = {push: jest.fn()};

  beforeEach(() => {
    wrapper = shallowMount(Login, {
      mocks: {$router}
    });
  });

  const findBtnSignIn = () => wrapper.find('button');
  const findInputUsername = () => wrapper.find('#username > input');
  const findInputPassword = () => wrapper.find('#password > input');
  const findMsgError = () => wrapper.find('.error');
  const findForm = () => wrapper.find('form');

  it('has data', () => {
    expect(typeof Login.data).toBe('function');
  });

  describe('when loaded', () => {
    it('has the required elements', () => {
      const findTitle = () => wrapper.find('h1');

      expect(findTitle().exists()).toBe(true);
      expect(findTitle().text()).toBe('Login Page');
      expect(findInputUsername().exists()).toBe(true);
      expect(findForm().exists()).toBe(true);
      expect(findInputPassword().exists()).toBe(true);
      expect(findBtnSignIn().exists()).toBe(true);
      expect(findBtnSignIn().text()).toBe('Sign In');
      expect(findMsgError().exists()).toBe(false);
    });
  });

  describe('when sign in button is clicked', () => {
    // helper function
    const fillLoginFieldAndSubmit = async (username, password) => {
      findInputUsername().setValue(username);
      findInputPassword().setValue(password);
      findForm().trigger('submit.prevent');
      await flushPromises();
    };
    const assertErrorMessage = message => {
      expect(findMsgError().exists()).toBe(true);
      expect(findMsgError().text()).toBe(message);
    };

    it('shows error when username or password is empty', async () => {
      await fillLoginFieldAndSubmit('', 'test');
      assertErrorMessage('Username Required');

      await fillLoginFieldAndSubmit('test@1234.co', '');
      assertErrorMessage('Password Required');

      await fillLoginFieldAndSubmit('test', 'test');
      assertErrorMessage('Valid Username Required');
    });

    it('hits login API and redirects to homepage', async () => {
      // TODO: Test this feature
      // authService.login.mockResolvedValue();
      // await fillLoginFieldAndSubmit('test@1234.co', 'test');
      // expect(authService.login).toHaveBeenCalled();
      // expect($router.push).toBeCalledWith('home');
    });

    it('shows error when API hit throws error', async () => {
      // TODO: Test this feature
      //   authService.login.mockRejectedValue();
      //   await fillLoginFieldAndSubmit('test@1234.co', 'test');
      //   expect(service.login).toBeCalled();
      //   assertErrorMessage('Login failed');
    });

    it('handlesLogin when both username and password are valid', async () => {
      await wrapper.find('#username > input').setValue('joe@1234.co');
      await wrapper.find('#password > input').setValue('bestPassw0rd');

      await wrapper.find('form').trigger('submit.prevent');
      expect(wrapper.vm.loading).toBe(true);
    });
  });
});
