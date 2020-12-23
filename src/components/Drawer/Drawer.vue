<template>
  <div class="drawer-overlay">
    <div
      :class="[
        'drawer-overlay__slider',
        active ? 'drawer-overlay__slider--slide-in' : 'drawer-overlay__slider--slide-out'
      ]"
    >
      <div @click="close" class="drawer-overlay__slider__header">
        <img
          class="drawer-overlay__slider__header__remove"
          src="@/assets/icons/Remove.svg"
          alt="Close drawer button"
        />
        <img
          class="drawer-overlay__slider__header__back"
          src="@/assets/icons/Back.svg"
          alt="Go back button"
        />
      </div>
      <slot>
        <!-- Dynamic content will be loaded here-->
      </slot>
    </div>
  </div>
</template>

<script src="./Drawer.js"></script>

<style lang="scss" src="./Drawer.scss" scoped></style>
