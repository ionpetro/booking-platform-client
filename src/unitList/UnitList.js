import AuthService from '../shared/services/auth.service';
import UnitService from './unit.service';
import Message from '../components/Message/Message.vue';
import UnitCard from './unitCard/UnitCard.vue';

const authService = new AuthService();
const unitService = new UnitService();

export default {
  name: 'UnitList',
  components: {
    UnitCard,
    'v-message': Message
  },
  data() {
    return {
      message: '',
      page: 1,
      size: 5,
      totalPages: 1,
      units: []
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      try {
        const response = await unitService.getUnits(this.page, this.size);
        this.units.push(...response.data.units);
        this.totalPages = response.data.totalPages;
      } catch (error) {
        this.message = error.message;
      }
    },
    visibilityChanged(isVisible) {
      if (!isVisible || this.page >= this.totalPages) {
        return;
      }
      this.page += 1;
      this.fetch();
    },
    logOut() {
      authService.logout();
      this.$router.push('/login');
    }
  }
};
