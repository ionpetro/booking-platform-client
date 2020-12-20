export default {
  data() {
    return {
      active: false
    };
  },
  computed: {
    element() {
      return this.$refs.element;
    },
    overlay() {
      return this.$refs.overlay;
    }
  },
  mounted() {
    this.addTransitionListener();
    this.addOnClickListener();
  },
  destroyed() {
    window.removeEventListener('transitionend', this.transitionListener, false);
    window.removeEventListener('click', this.clickListener, false);
  },
  methods: {
    addTransitionListener() {
      this.overlay.addEventListener('transitionend', this.transitionListener, false);
    },
    addOnClickListener() {
      this.overlay.addEventListener('click', this.clickListener, false);
    },
    clickListener() {
      this.close();
    },
    transitionListener(event) {
      this.handleZIndex(event);
    },
    /**
     * HandleZIndex is executed when the drawer transition is finished
     * due to the transitionListener. This way, the overlay will go to
     * the back when drawer is closed and overlay opacity hits 0.
     */
    handleZIndex() {
      const opacity = window.getComputedStyle(this.overlay).getPropertyValue('opacity');
      if (opacity <= 0) {
        this.overlay.style.zIndex = -999;
      }
    },
    overlayOpacity(opacity) {
      this.overlay.style.opacity = opacity;
      if (opacity > 0) {
        this.overlay.style.zIndex = 999;
      }
    },
    open() {
      this.overlayOpacity(1);
      this.lock(document.querySelector('html'));
      this.lock(document.querySelector('body'));
      this.active = true;
    },
    close() {
      this.overlayOpacity(0);
      this.unlock(document.querySelector('html'));
      this.unlock(document.querySelector('body'));
      this.active = false;
    },
    lock(element) {
      const updatedElement = element;
      updatedElement.style.overflow = 'hidden';
      updatedElement.style.touchAction = 'none';
    },
    unlock(element) {
      element.style.removeProperty('overflow');
      element.style.removeProperty('touch-action');
    }
  }
};
