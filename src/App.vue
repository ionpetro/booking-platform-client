<template>
  <div id="app">
    <transition name="fade">
      <div>
        <Navigation v-if="!hideNavigation($route.name)" />
        <router-view />
      </div>
    </transition>
  </div>
</template>

<script src="./App.js"></script>

<style lang="scss" src="./App.scss"></style>
