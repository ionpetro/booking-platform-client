export default {
  data() {
    return {
      showEye: true,
      customType: this.type
    };
  },
  props: {
    value: {
      required: true,
      type: String
    },
    name: {
      required: true,
      type: String
    },
    labelName: {
      required: true,
      type: String
    },
    errors: {
      required: false,
      type: [String || null]
    },
    placeholder: {
      required: true,
      type: String
    },
    type: {
      required: true,
      default: 'text',
      type: String
    }
  },
  methods: {
    // toggle password input
    showPassword() {
      if (this.name === 'password') {
        if (this.customType === 'password') {
          this.customType = 'text';
          this.showEye = !this.showEye;
        } else {
          this.customType = 'password';
          this.showEye = !this.showEye;
        }
      }
    }
  }
};
