import {BeatLoader} from '@saeris/vue-spinners';
import Button from '../components/Button/Button.vue';
import Input from '../components/Input/Input.vue';
import Message from '../components/Message/Message.vue';
import User from '../models/user';
import AuthService from '../shared/services/auth.service';

const authService = new AuthService();

export default {
  name: 'Login',
  components: {
    BeatLoader,
    'v-button': Button,
    'v-input': Input,
    'v-message': Message
  },
  data() {
    return {
      show: false,
      loading: false,
      user: new User('', ''),
      remember: false,
      errors: {},
      message: ''
    };
  },
  mounted() {
    this.show = true;
  },
  methods: {
    checkForm() {
      this.errors = {};

      if (!this.user.username) {
        this.errors.username = '* Please, fill your username.';
      } else if (!this.validUsername(this.user.username)) {
        this.errors.username = '* Please, correct your username';
      }

      if (!this.user.password) {
        this.errors.password = '* Please, fill your password.';
      }
    },
    validUsername(username) {
      const re = /^\w{2,8}@(\d{4}\.)[\w]{2}$/;
      return re.test(username);
    },
    handleLogin() {
      // validate form and check for errors
      this.checkForm();
      // if you find errors, interrupt login
      if (Object.keys(this.errors).length) {
        this.loading = false;
        return;
      }
      this.loading = true;
      if (this.user.username && this.user.password) {
        authService
          .login(this.user, this.remember)
          .then(() => {
            this.$router.push('/');
          })
          .catch(error => {
            this.loading = false;
            this.message =
              (error.response && error.response.data.message) || error.message || error.toString();
          });
      }
    },
    deleteError(name) {
      // when user focuses on the input, the error message is deleted
      if (name === 'username') {
        this.$delete(this.errors, 'username');
      }
      if (name === 'password') {
        this.$delete(this.errors, 'password');
      }
    },
    clickCheckbox() {
      this.remember = !this.remember;
    }
  },
  created() {
    // Redirect user to home page if already authenticated
    if (localStorage.getItem('user') || sessionStorage.getItem('user')) {
      this.$router.push('/');
    }
  }
};
