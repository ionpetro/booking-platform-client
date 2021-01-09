import Vue from 'vue';
import VueObserveVisibility from 'vue-observe-visibility';
import {VueSpinners} from '@saeris/vue-spinners';
import VueCookies from 'vue-cookies';
import App from './App.vue';
import router from './router';

import interceptorsSetup from './shared/helpers/interceptors';
import globalDirectivesHandler from './shared/helpers/directives/globalDirectivesHandler';

interceptorsSetup();
globalDirectivesHandler();

Vue.use(VueCookies);
Vue.use(VueSpinners);
Vue.use(VueObserveVisibility);

Vue.config.productionTip = false;

// set secure, only https works
Vue.$cookies.config('', '', '', true);

new Vue({
  router,
  mounted() {},
  render: h => h(App)
}).$mount('#app');
