<template>
  <div>
    <h1>Login Page</h1>
    <form name="form" @submit.prevent="handleLogin">
      <div>
        <label for="email">Colonist ID</label>
        <input type="text" v-model="user.username" />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" v-model="user.password" />
      </div>
      <div>
        <input type="checkbox" />
        <label for="rememberMe">Remember Me</label>
      </div>
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>

<script>
import User from '../models/user';
import AuthService from './auth.service';

const authService = new AuthService();

export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      user: new User('', ''),
      remember: false
    };
  },
  methods: {
    handleLogin() {
      console.log(authService);
      this.loading = true;
      if (this.user.username && this.user.password) {
        authService.login(this.user, this.remember).then(response => {
          this.loading = false;
          return Promise.resolve(response);
        });
      }
    }
  }
};
</script>

<style></style>
