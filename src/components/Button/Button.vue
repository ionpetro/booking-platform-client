<template>
  <button class="btn" :class="[variant, size]">
    <slot>Button</slot>
  </button>
</template>

<script src="./Button.js"></script>

<style src="./Button.scss" lang="scss"></style>
