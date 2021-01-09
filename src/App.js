import Navigation from './components/Navigation/Navigation.vue';

export default {
  name: 'App',
  components: {
    Navigation
  },
  data() {
    return {
      disabledNavigationRoutes: ['login']
    };
  },
  methods: {
    hideNavigation(routeName) {
      return this.disabledNavigationRoutes.includes(routeName);
    }
  }
};
