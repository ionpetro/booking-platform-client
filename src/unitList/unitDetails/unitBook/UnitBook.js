import Button from '../../../components/Button/Button.vue';
import UnitBookDate from './unitBookDate/UnitBookDate.vue';
import UnitService from '../../unit.service';

const userService = new UnitService();

export default {
  components: {
    UnitBookDate,
    'v-button': Button
  },
  data: () => ({selectedYear: undefined}),
  props: {
    unit: {
      required: true
    }
  },
  computed: {
    hasDiscount() {
      return !(this.unit.price === this.unit.discountedPrice);
    }
  },
  methods: {
    yearSelected(year) {
      this.selectedYear = year;
    },
    bookUnit() {
      const date = new Date();
      userService
        .bookUnitById({
          unitId: this.unit.id,
          bookDate: this.selectedYear,
          price: this.unit.discountedPrice,
          bookTime: date.toISOString()
        })
        .then(response => {
          document.body.style.overflow = '';

          this.$router.push({
            name: 'bookRef',
            params: {
              id: response.bookId,
              crater: response.crater,
              craterDescription: response.craterDescription
            }
          });
        })
        .catch(err => {
          this.$emit('onErrorMessage', err);
        });
    }
  }
};
