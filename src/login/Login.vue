<template>
  <div id="login">
    <div>
      <img class="hero" src="@/assets/images/hero.png" alt="hero" />
    </div>
    <div class="content">
      <img class="logo" src="@/assets/images/blue.png" alt="logo" />
      <h1 class="heading">Welcome Back</h1>
      <div class="error" v-if="message">{{ message }}</div>

      <form name="form" @submit.prevent="checkForm">
        <div id="username">
          <v-input
            :name="'username'"
            :labelName="'Username'"
            :type="'text'"
            :errors="errors.username"
            :placeholder="'ex. joe@2020.co'"
            v-model="user.username"
            @focused="deleteErrors"
          ></v-input>
          <div class="errors" v-show="errors.hasOwnProperty('username')">{{ errors.username }}</div>
        </div>
        <br />
        <div id="password">
          <v-input
            :name="'password'"
            :labelName="'Password'"
            :placeholder="'Fill your password here..'"
            :type="'password'"
            :errors="errors.password"
            v-model="user.password"
            @focused="deleteErrors"
          ></v-input>
          <div class="errors" v-show="errors.hasOwnProperty('password')">{{ errors.password }}</div>
        </div>
        <div id="remember">
          <label @click="remember = !remember" class="checkbox">
            <span class="checkbox__input">
              <input type="checkbox" name="checkbox" />
              <span class="checkbox__control">
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 9 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.16583 0.833374L3.24746 7.85928C3.11582 8.04845 2.90126 8.1628 2.67083 8.16661C2.44039 8.17042 2.22218 8.06322 2.08435 7.87851L0.833252 6.21059"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </span>
            <span class="checkbox__text">Remember me</span>
          </label>
        </div>
        <v-button class="button" :size="'regular'" :variant="'primary'">Login</v-button>
      </form>
    </div>
  </div>
</template>

<script>
import Button from '../components/Button.vue';
import Input from '../components/Input.vue';
import User from '../models/user';
import AuthService from '../shared/services/auth.service';

const authService = new AuthService();

export default {
  name: 'Login',
  components: {
    'v-button': Button,
    'v-input': Input
  },
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
        this.errors.username = '* Please, fill your username.';
      } else if (!this.validUsername(this.user.username)) {
        this.errors.username = '* Please, correct your username';
      }

      if (!this.user.password) {
        this.errors.password = '* Please, fill your password.';
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
            this.loading = false;
            this.message =
              (error.response && error.response.data) || error.message || error.toString();
          }
        );
      }
    },
    deleteErrors(labelName) {
      // when user focuses on the input, the error message is deleted
      if (labelName === 'Username') {
        this.$delete(this.errors, 'username');
      }
      if (labelName === 'Password') {
        this.$delete(this.errors, 'password');
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
