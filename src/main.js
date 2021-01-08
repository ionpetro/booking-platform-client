import Vue from 'vue';
import VueObserveVisibility from 'vue-observe-visibility';
import {VueSpinners} from '@saeris/vue-spinners';
import VueCookies from 'vue-cookies';
import App from './App.vue';
import router from './router';

// import interceptors
import interceptorsSetup from './shared/helpers/interceptors';

interceptorsSetup();

Vue.use(VueCookies);
Vue.use(VueSpinners);
Vue.use(VueObserveVisibility);

Vue.directive('click-outside', {
  bind: (el, binding, vnode) => {
    const customEl = el;
    customEl.clickOutsideEvent = event => {
      // here I check that click was outside the el and his children
      if (!(el === event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        const vnodeCustom = vnode;
        vnodeCustom.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unbind: el => {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  }
});

Vue.config.productionTip = false;

// set secure, only https works
Vue.$cookies.config('', '', '', true);

new Vue({
  router,
  mounted() {},
  render: h => h(App)
}).$mount('#app');
