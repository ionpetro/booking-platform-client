<template>
  <div class="message" :class="type">
    <div class="message__icon">
      <img v-if="type === 'error'" src="@/assets/icons/error.svg" alt="error-icon" />
      <img v-else-if="type === 'warning'" src="@/assets/icons/warning.svg" alt="warning-icon" />
      <img v-else-if="type === 'success'" src="@/assets/icons/success.svg" alt="success-icon" />
    </div>
    <div class="message__text">
      <slot></slot>
    </div>
  </div>
</template>

<script src="./Message.js"></script>

<style src="./Message.scss" lang="scss"></style>
