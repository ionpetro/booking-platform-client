import Vue from 'vue';
import Router from 'vue-router';
import Login from './login/Login.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
});

export {router as default};
