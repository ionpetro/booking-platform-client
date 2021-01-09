import AuthService from '../../shared/services/auth.service';

const authService = new AuthService();

export default {
  name: 'Navigation',
  data: () => ({
    user: null,
    showDropDown: false,
    scrollPosition: undefined,
    openMobileNav: false
  }),
  destroyed() {
    window.removeEventListener('scroll', this.updateScroll);
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
    this.user =
      JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
    toggleDropdown() {
      this.showDropDown = !this.showDropDown;
    },
    closeDropdown() {
      this.showDropDown = false;
    },
    toggleMobileNav() {
      this.openMobileNav = !this.openMobileNav;
    },
    logOut() {
      authService.logout();
      this.$router.push('/login');
    }
  }
};
