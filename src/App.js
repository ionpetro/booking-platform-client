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
      disabledNavigationRoutes: ['login'],
      disabledFooterRoutes: ['login', 'bookRef']
    };
  },
  methods: {
    hideNavigation(routeName) {
      return this.disabledNavigationRoutes.includes(routeName);
    },
    hideFooter(routeName) {
      return this.disabledFooterRoutes.includes(routeName);
    }
  }
};
