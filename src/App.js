import Navigation from './components/Navigation/Navigation.vue';
import Footer from './components/Footer/Footer.vue';

export default {
  name: 'App',
  components: {
    Navigation,
    Footer
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
