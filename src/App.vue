<template>
  <div id="app">
    <transition name="fade">
      <div>
        <Navigation v-if="excludedRoute !== $route.name" />
        <router-view />
      </div>
    </transition>
  </div>
</template>

<script>
import Navigation from './components/Navigation/Navigation.vue';

export default {
  name: 'App',
  components: {
    Navigation
  },
  data() {
    return {
      excludedRoute: 'login'
    };
  }
};
</script>

<style>
.fade-enter-active,
.face-leave-active {
  transition: opacity 2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
