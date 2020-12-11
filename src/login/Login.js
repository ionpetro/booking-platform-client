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
      // returns the number of errors found
      return Object.keys(this.errors).length;
    },
    validUsername(username) {
      const re = /^\w{2,8}@(\d{4}\.)[\w]{2}$/;
      return re.test(username);
    },
    handleLogin() {
      // if you find errors, interrupt login
      if (this.checkForm()) {
        return;
      }
      this.loading = true;
      authService
        .login(this.user, this.remember)
        .then(() => {
          this.$router.push('/');
        })
        .catch(error => {
          this.loading = false;
          this.message = error.message;
        });
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
