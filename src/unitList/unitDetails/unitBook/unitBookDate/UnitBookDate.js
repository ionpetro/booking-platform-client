import Input from '../../../../components/Input/Input.vue';

export default {
  components: {
    'v-input': Input
  },
  data: () => ({
    show: false,
    selectedYear: null,
    years: ['2080', '2081', '2082', '2083', '2084', '2085', '2086', '2087', '2088']
  }),
  props: {
    unit: {
      required: true
    }
  },
  methods: {
    disabledYears(year) {
      return this.unit.reservedYears.includes(+year);
    },
    hideModal() {
      this.show = false;
    },
    toggleModal() {
      this.show = !this.show;
    },
    selectYear(year) {
      if (this.disabledYears(year)) {
        return;
      }
      this.selectedYear = year;
      this.$emit('onSelectedYear', year);
    }
  }
};
