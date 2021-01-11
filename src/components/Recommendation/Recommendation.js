import {gsap} from 'gsap';
import {BeatLoader} from '@saeris/vue-spinners';
import Button from '../Button/Button.vue';

export default {
  name: 'recommendation',
  components: {
    'beat-loader': BeatLoader,
    'v-button': Button
  },
  data() {
    return {
      loading: true,
      // hardcoded for demo purposes
      perfectMatchId: 3
    };
  },
  methods: {
    viewUnit() {
      this.$router.push({name: 'units', params: {id: this.perfectMatchId}});
    },
    animateRecommendationComponent() {
      gsap.set('.recommendation__features__feature', {
        x: -50,
        opacity: 0,
        transformOrigin: '50% 50%'
      });
      const tl = gsap.timeline({defaults: {duration: 1}});
      tl.to(
        '.recommendation__features__feature',
        {
          x: 0,
          opacity: 1,
          stagger: 0.8
        },
        '+=1'
      ).add(() => {
        this.loading = false;
      });
    }
  },
  mounted() {
    this.animateRecommendationComponent();
  }
};
