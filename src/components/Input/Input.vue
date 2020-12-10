<template>
  <div class="input">
    <input
      :value="value"
      :type="customType"
      :placeholder="placeholder"
      :class="['input__text', {input__errors: errors}]"
      @input="$emit('input', $event.target.value)"
      @focus="$emit('focused')"
    />
    <label class="label__text" :class="['label__text', {label__errors: errors}]" for="name">{{
      labelName
    }}</label>
    <div class="input__icon" @click="showPassword" v-if="type === 'password'">
      <img v-show="showEye" src="@/assets/icons/Eye.svg" alt="show password" />
      <img v-show="!showEye" src="@/assets/icons/Eye-Off.svg" alt="hide password" />
    </div>
  </div>
</template>

<script src="./Input.js"></script>

<style src="./Input.scss" lang="scss"></style>
