export default {
  name: 'UnitCard',
  props: {
    unit: {
      required: true
    }
  },
  /*
    The @initialPrice is calculated by the unit's current price
    plus the discount that was applied to that unit
  */
  computed: {
    initialPrice() {
      return this.unit.price + this.unit.price * this.unit.discount;
    }
  }
};
