import {mount} from '@vue/test-utils';
import flushPromises from 'flush-promises';
import axios from 'axios';
import Login from '../Login.vue';
import Button from '../../components/Button/Button.vue';
import Message from '../../components/Message/Message.vue';
import authService from '../../shared/services/auth.service';

jest.mock('axios');

describe('Login', () => {
  let wrapper;
  const $router = {push: jest.fn()};

  beforeEach(() => {
    wrapper = mount(Login, {
      mocks: {$router}
    });
  });

  const findForm = () => wrapper.find('form');
  const findMsgError = () => wrapper.find('.errors');
  const findInputUsername = () => wrapper.find('.username input');
  const findInputPassword = () => wrapper.find('.password input');
  const findBtnSignIn = () => wrapper.findComponent(Button);

  it('has data', () => {
    expect(typeof Login.data).toBe('function');
  });

  describe('when loaded', () => {
    it('has the required elements', () => {
      const findTitle = () => wrapper.find('h1');

      expect(findTitle().exists()).toBe(true);
      expect(findTitle().text()).toBe('Welcome Back');
      expect(findInputUsername().exists()).toBe(true);
      expect(findForm().exists()).toBe(true);
      expect(findInputPassword().exists()).toBe(true);
      expect(findBtnSignIn().exists()).toBe(true);
      expect(findBtnSignIn().text()).toBe('Login');
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
      assertErrorMessage('* Please, fill your username.');

      await fillLoginFieldAndSubmit('test@1234.co', '');
      assertErrorMessage('* Please, fill your password.');

      await fillLoginFieldAndSubmit('test', 'test');
      assertErrorMessage('* Please, correct your username');
    });

    it('hits login API with correct credentials and redirects to home page', async () => {
      const mockedUser = {
        username: 'test@1234.co',
        password: 'test'
      };
      const resp = {data: mockedUser};
      axios.post.mockResolvedValue(resp);
      await fillLoginFieldAndSubmit('test@1234.co', 'test');
      await wrapper.find('form').trigger('submit.prevent');
      expect(wrapper.vm.loading).toBe(true);
      authService.prototype
        .login('test@1234.co', 'test', true)
        .then(data => expect(data).toEqual(mockedUser));
      expect($router.push).toHaveBeenCalledWith('/');
    });

    it('shows error when API throws error', async () => {
      const resp = new Error('Network Error');
      axios.post.mockRejectedValue(resp);
      await fillLoginFieldAndSubmit('invalid@1234.co', 'invalid');
      await wrapper.find('form').trigger('submit.prevent');
      authService.prototype
        .login('invalid@1234.co', 'invalid')
        .then(data => expect(data).toEqual(resp));
      expect(wrapper.vm.loading).toBe(false);
      expect(wrapper.findComponent(Message).text()).toEqual('Network Error');
    });
  });
});
