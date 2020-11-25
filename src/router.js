import Vue from 'vue';
import Router from 'vue-router';
import Login from './login/Login.vue';
import Home from './home/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
});

export {router as default};
