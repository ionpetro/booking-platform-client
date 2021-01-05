import Message from '../../components/Message/Message.vue';
import UnitBook from './unitBook/UnitBook.vue';
import UnitService from '../unit.service';

const unitService = new UnitService();

export default {
  components: {
    UnitBook,
    'v-message': Message
  },
  props: ['selectedUnitId'],
  data() {
    return {
      unit: '',
      loading: false,
      message: ''
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.loading = true;
      try {
        this.unit = await unitService.getUnitById(this.selectedUnitId);
        this.message = '';
      } catch (error) {
        this.unit = '';
        this.message = error.message;
      } finally {
        this.loading = false;
      }
    }
  }
};
