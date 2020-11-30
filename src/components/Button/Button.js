const sizes = {
  small: 'small',
  regular: 'regular',
  large: 'large'
};

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
    size: {
      type: String,
      default: sizes.regular,
      validator: value => Object.values(sizes).includes(value)
    },
    variant: {
      type: [String, null],
      default: variants.primary,
      validator: value => Object.values(variants).includes(value)
    }
  }
};
