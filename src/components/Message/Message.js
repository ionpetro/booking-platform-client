const types = {
  success: 'success',
  warning: 'warning',
  error: 'error'
};

export default {
  props: {
    type: {
      type: [String],
      validator: value => Object.values(types).includes(value)
    }
  }
};
