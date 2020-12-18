export default {
  props: ['exist'],
  data() {
    return {
      speed: '0.6s',
      startTime: null,
      startPos: null,
      translate: null,
      active: false,
      visible: true
    };
  },
  computed: {
    element() {
      return this.$refs.element;
    },
    overlay() {
      return this.$refs.overlay;
    },
    enabled() {
      return this.exist === true;
    },
    style() {
      return 'transform:translate3d(100%,0,0);right:0;';
    }
  },
  mounted() {
    document.addEventListener('DOMContentLoaded', () => {
      this.overlay.addEventListener(
        'transitionend',
        e => {
          this.handleZindex(e);
        },
        false
      );
      this.overlay.addEventListener(
        'click',
        () => {
          this.close();
        },
        false
      );
      this.setVisibility();
    });
  },
  methods: {
    setVisibility() {
      if (this.element.offsetWidth === 0) {
        this.visible = false;
      } else {
        this.visible = true;
      }
    },
    handleZindex() {
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
      this.translate = 0;
      this.element.style.transform = `translate3d(${this.translate},0,0)`;
      this.element.style.transitionDuration = this.speed;
      this.overlayOpacity(1);
      this.lock(document.querySelector('html'));
      this.lock(document.querySelector('body'));
      this.element.classList.add('active');
      this.active = true;
    },
    close() {
      this.translate = `${this.element.offsetWidth}px`;
      this.element.style.transform = `translate3d(${this.translate},0,0)`;
      this.element.style.transitionDuration = this.speed;
      this.overlayOpacity(0);
      this.unlock(document.querySelector('html'));
      this.unlock(document.querySelector('body'));
      this.element.classList.remove('active');
      this.active = false;
    },
    lock(element) {
      const myElement = element;
      myElement.style.overflow = 'hidden';
      myElement.style.touchAction = 'none';
    },
    unlock(element) {
      element.style.removeProperty('overflow');
      element.style.removeProperty('touch-action');
    }
  }
};
