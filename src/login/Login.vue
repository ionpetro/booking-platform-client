<template>
  <div>
    <h1>Login Page</h1>
    <form name="form" @submit.prevent="checkForm">
      <div>
        <label for="email">Colonist ID</label>
        <input type="text" v-model="user.username" />
        <div v-if="errors.hasOwnProperty('username')">{{ errors.username }}</div>
      </div>
      <br />
      <div>
        <label for="password">Password</label>
        <input type="password" v-model="user.password" />
        <div v-if="errors.hasOwnProperty('password')">{{ errors.password }}</div>
      </div>
      <div>
        <input @click="remember = !remember" type="checkbox" />
        <label for="rememberMe">Remember Me</label>
      </div>
      <div v-if="message">{{ message }}</div>
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>

<script>
import User from '../models/user';
import AuthService from '../shared/services/auth.service';

const authService = new AuthService();

export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      user: new User('', ''),
      remember: false,
      errors: {},
      message: ''
    };
  },
  methods: {
    checkForm() {
      this.errors = {};

      if (!this.user.username) {
        this.errors.username = 'Username Required';
      } else if (!this.validUsername(this.user.username)) {
        this.errors.username = 'Valid Username Required';
      }

      if (!this.user.password) {
        this.errors.password = 'Password Required';
      }

      // if there are no validation errors, proceed with login
      if (!Object.keys(this.errors).length) {
        this.handleLogin();
      }
    },
    validUsername(username) {
      const re = /^\w{2,8}@(\d{4}\.)[\w]{2}$/;
      return re.test(username);
    },
    handleLogin() {
      this.loading = true;
      if (this.user.username && this.user.password) {
        authService.login(this.user, this.remember).then(
          () => {
            this.$router.push('/');
          },
          error => {
            this.message =
              (error.response && error.response.data) || error.message || error.toString();
          }
        );
      }
    }
  },
  created() {
    // Redirect user to home page if already authenticated
    let user = localStorage.getItem('user') || sessionStorage.getItem('user');
    user = JSON.parse(user);
    if (user && user.jwt) {
      this.$router.push('/');
    }
  }
};
</script>

<style></style>
