<template>
  <section :class="active ? 'openDrawer' : 'closeDrawer'">
    <aside class="sidebar" ref="element">
      <div @click="close" class="sidebar__close">
        <img src="@/assets/icons/Remove.svg" alt="Cancel Icon" />
      </div>
      <slot></slot>
    </aside>
    <div class="overlay" ref="overlay"></div>
  </section>
</template>
<script src="./Drawer.js"></script>
<style lang="scss" src="./Drawer.scss"></style>
