// import {mount} from '@vue/test-utils';
import Login from '../src/login/Login.vue';

describe('Login', () => {
  it('has data', () => {
    expect(typeof Login.data).toBe('function');
  });
});
