<template>
  <div id="app">
    <transition name="fade">
      <div>
        <Navigation v-if="!hideNavigation($route.name)" />
        <router-view />
        <Footer v-if="!hideFooter($route.name)"></Footer>
      </div>
    </transition>
  </div>
</template>

<script src="./App.js"></script>

<style lang="scss" src="./App.scss"></style>
