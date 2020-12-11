const variants = {
  light: 'light',
  dark: 'dark',
  success: 'success',
  danger: 'danger',
  primary: 'primary',
  secondary: 'secondary'
};

export default {
  props: {
    variant: {
      type: [String, null],
      default: variants.primary,
      validator: value => Object.values(variants).includes(value)
    }
  }
};
