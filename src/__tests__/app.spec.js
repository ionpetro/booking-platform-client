import {mount, createLocalVue} from '@vue/test-utils';
import VueRouter from 'vue-router';
import App from '../App.vue';
import Login from '../login/Login.vue';
import Footer from '../components/Footer/Footer.vue';
import Navigation from '../components/Navigation/Navigation.vue';
import BookRef from '../bookRef/BookRef.vue';
import clickOutsideDirective from '../shared/helpers/directives/clickOutside';

const localVue = createLocalVue();
localVue.use(VueRouter);
describe('App', () => {
  beforeEach(() => {
    clickOutsideDirective();
  });
  it('hides Footer and Navigation from login page', async () => {
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
    expect(wrapper.findComponent(Footer).exists()).toBe(false);
    expect(wrapper.findComponent(Navigation).exists()).toBe(false);
  });

  it('hides Footer from bookRef page', async () => {
    const router = new VueRouter({
      mode: 'history',
      routes: [
        {
          path: '/bookRef/:id',
          name: 'bookRef',
          component: BookRef
        }
      ]
    });

    const wrapper = mount(App, {
      localVue,
      router
    });

    router.push('/bookRef/1');
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(BookRef).exists()).toBe(true);
    expect(wrapper.findComponent(Footer).exists()).toBe(false);
  });
});
