const types = {
  text: 'text',
  password: 'password'
};

export default {
  data() {
    return {
      showEye: true,
      customType: this.type
    };
  },
  props: {
    value: String,
    name: String,
    labelName: String,
    placeholder: String,
    errors: {
      required: false,
      type: [String || null]
    },
    type: {
      required: true,
      default: types.text,
      type: String,
      validator: value => Object.values(types).includes(value)
    }
  },
  methods: {
    // toggle password input
    showPassword() {
      if (this.name !== types.password) {
        return;
      }
      this.customType = this.customType === types.password ? types.text : types.password;
      this.showEye = !this.showEye;
    }
  }
};
