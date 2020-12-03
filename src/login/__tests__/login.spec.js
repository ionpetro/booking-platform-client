import {mount} from '@vue/test-utils';
import flushPromises from 'flush-promises';
import Login from '../Login.vue';
import Message from '../../components/Message/Message.vue';
import AuthService from '../../shared/services/auth.service';

describe('Login', () => {
  let wrapper;
  const $router = {push: jest.fn()};

  const loginMock = jest.fn();
  AuthService.prototype.login = loginMock;

  beforeEach(() => {
    wrapper = mount(Login, {
      mocks: {$router}
    });
  });

  const findForm = () => wrapper.find('form');
  const findMsgError = () => wrapper.find('.errors');
  const findInputUsername = () => wrapper.find('.username input');
  const findInputPassword = () => wrapper.find('.password input');

  describe('when loaded', () => {
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
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
      assertErrorMessage('Please fill out your username.');

      await fillLoginFieldAndSubmit('test@1234.co', '');
      assertErrorMessage('Please fill out your password.');

      await fillLoginFieldAndSubmit('test', 'test');
      assertErrorMessage('Please correct your username');
    });

    it('hits login API with correct credentials and redirects to home page', async () => {
      const mockedUser = {
        username: 'test@1234.co',
        password: 'test'
      };
      const resp = {data: {...mockedUser, accessToken: 'token', refreshToken: 'token'}};
      loginMock.mockResolvedValue(Promise.resolve(resp));
      await fillLoginFieldAndSubmit('test@1234.co', 'test');
      await wrapper.find('form').trigger('submit.prevent');
      expect(wrapper.vm.loading).toBe(true);
      await flushPromises();
      expect($router.push).toHaveBeenCalledWith('/units');
    });

    it('shows error when API throws error', async () => {
      const resp = new Error('Error');
      loginMock.mockResolvedValue(Promise.reject(resp));
      await fillLoginFieldAndSubmit('invalid@1234.co', 'invalid');
      await wrapper.find('form').trigger('submit.prevent');
      await flushPromises();
      expect(wrapper.vm.loading).toBe(false);
      expect(wrapper.findComponent(Message).text()).toEqual('Error');
    });
  });
});
