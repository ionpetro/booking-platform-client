export default {
  name: 'Drawer',
  data() {
    return {
      active: false,
      isDrawerOpened: false
    };
  },
  watch: {
    active() {
      document.body.style.overflow = this.active ? 'hidden' : '';
    }
  },
  mounted() {
    this.open();
    this.addOnKeyPressListener();
    this.addOnClickListener();
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDownListener, false);
    window.removeEventListener('click', this.clickListener, false);
  },
  methods: {
    addOnClickListener() {
      document
        .querySelector('div.drawer-overlay')
        .addEventListener('click', this.clickListener, false);
    },
    addOnKeyPressListener() {
      document.addEventListener('keydown', this.keyDownListener, false);
    },
    keyDownListener(e) {
      // If key pressed is ESC then close drawer
      if (e.keyCode === 27) this.close();
    },
    clickListener(e) {
      // If the event target element is the overlay itself then close drawer
      if (e.target.className === 'drawer-overlay') this.close();
    },
    open() {
      this.active = true;
    },
    close() {
      this.active = false;
      // Set 500ms timeout in order slide out effect to be completed before component is unmounted
      setTimeout(() => this.$emit('onDrawerClosed', true), 500);
    }
  }
};
