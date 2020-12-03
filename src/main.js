import {VueSpinners} from '@saeris/vue-spinners';
import Vue from 'vue';
import VueCookies from 'vue-cookies';
import App from './App.vue';
import router from './router';

// import interceptors
import interceptorsSetup from './shared/helpers/interceptors';

interceptorsSetup();

Vue.use(VueCookies);
Vue.use(VueSpinners);
Vue.config.productionTip = false;

// set secure, only https works
Vue.$cookies.config('', '', '', true);

new Vue({
  router,
  mounted() {},
  render: h => h(App)
}).$mount('#app');
