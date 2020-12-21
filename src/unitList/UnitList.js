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
      loading: false,
      page: 1,
      size: 16,
      totalPages: 1,
      units: []
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.loading = true;
      try {
        const response = await unitService.getUnits(this.page, this.size);
        this.units = [...this.units, ...response.units];
        this.totalPages = response.totalPages;
      } catch (error) {
        this.message = error.message;
      } finally {
        this.loading = false;
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
