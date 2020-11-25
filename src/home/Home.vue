<template>
  <div>
    <h1>Home Page</h1>
    <a href @click.prevent="logOut">Logout</a>
  </div>
</template>

<script>
import AuthService from '../login/auth.service';

const authService = new AuthService();
export default {
  methods: {
    logOut() {
      authService.logout();
      this.$router.push('/login');
    }
  }
};
</script>
