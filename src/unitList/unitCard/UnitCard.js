export default {
  name: 'UnitCard',
  props: {
    unit: {
      required: true
    }
  },
  /*
    The @hadDiscount returns true if the unit has a discount
    and false if it doesn't.
  */
  computed: {
    hasDiscount() {
      return !(this.unit.price === this.unit.discountedPrice);
    }
  }
};
