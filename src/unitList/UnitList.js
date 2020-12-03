import AuthService from '../shared/services/auth.service';

const authService = new AuthService();

export default {
  name: 'UnitList',
  methods: {
    logOut() {
      authService.logout();
      this.$router.push('/login');
    }
  }
};
