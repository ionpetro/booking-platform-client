<template>
  <div id="app">
    <transition name="fade">
      <div>
        <Navigation v-if="!hideNavigation($route.name)" />
        <!-- Remember the state of home page component, so as to
        not animate recommendation component multiple times -->
        <keep-alive include="home">
          <router-view />
        </keep-alive>
      </div>
    </transition>
  </div>
</template>

<script src="./App.js"></script>

<style lang="scss" src="./App.scss"></style>
