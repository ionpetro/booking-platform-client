import Button from '../../../components/Button/Button.vue';

export default {
  components: {
    'v-button': Button
  },
  props: {
    unit: {
      required: true
    }
  },
  computed: {
    hasDiscount() {
      return !(this.unit.price === this.unit.discountedPrice);
    }
  }
};
