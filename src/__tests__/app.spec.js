import {mount, createLocalVue} from '@vue/test-utils';
import VueRouter from 'vue-router';
import App from '../App.vue';
import Login from '../login/Login.vue';
import Navigation from '../components/Navigation/Navigation.vue';
import clickOutsideDirective from '../shared/helpers/directives/clickOutside';

const localVue = createLocalVue();
localVue.use(VueRouter);
describe('App', () => {
  beforeEach(() => {
    clickOutsideDirective();
  });
  it('hides Navigation from login page', async () => {
    const router = new VueRouter({
      mode: 'history',
      routes: [
        {
          path: '/login',
          name: 'login',
          component: Login
        }
      ]
    });

    const wrapper = mount(App, {
      localVue,
      router
    });

    router.push('/login');
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(Login).exists()).toBe(true);
    expect(wrapper.findComponent(Navigation).exists()).toBe(false);
  });
});
