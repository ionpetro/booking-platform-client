import Vue from 'vue';
import Router from 'vue-router';
import Login from './login/Login.vue';
import UnitList from './unitList/UnitList.vue';
import BookRef from './bookRef/BookRef.vue';
import Home from './home/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'is-active',
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
    },
    {
      path: '/units',
      name: 'units',
      component: UnitList
    },
    {
      path: '/bookRef/:id',
      name: 'bookRef',
      component: BookRef
    }
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user') || sessionStorage.getItem('user');

  // if you are not logged in and try to access restricted page
  // you are redirected to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
