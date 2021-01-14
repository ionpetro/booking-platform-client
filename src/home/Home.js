import {gsap} from 'gsap';
import Button from '../components/Button/Button.vue';
import Recommendation from '../components/Recommendation/Recommendation.vue';
import Footer from '../components/Footer/Footer.vue';

export default {
  name: 'home',
  components: {
    'v-recommendation': Recommendation,
    'v-button': Button,
    Footer
  },
  data() {
    return {
      authenticated: false
    };
  },
  // this component is keep-alive, so we need to
  // check if user is authenticated every time it
  // is activated
  activated() {
    this.authenticated = this.isAuth();
  },
  methods: {
    isAuth() {
      return !!(localStorage.getItem('user') || sessionStorage.getItem('user'));
    },
    viewUnits() {
      if (this.authenticated) {
        this.$router.push('/units');
      } else {
        this.$router.push({name: 'login', query: {redirect: '/units'}});
      }
    },
    animateHomePage() {
      gsap.set('.animateIntro', {x: -50, opacity: 0});

      const tl = gsap.timeline({defaults: {duration: 1}});

      tl.from('.home__main__image', {x: 100}).to(
        '.animateIntro',
        {
          x: 0,
          opacity: 1,
          stagger: 0.4
        },
        '-=1'
      );
    }
  },
  mounted() {
    this.animateHomePage();
  }
};
