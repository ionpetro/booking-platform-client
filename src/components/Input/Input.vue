<template>
  <div class="form-group">
    <input
      :value="value"
      :type="customType"
      class="text-input"
      :placeholder="placeholder"
      :class="errors ? 'input-errors' : ''"
      @input="$emit('input', $event.target.value)"
      @focus="$emit('focused', labelName)"
    />
    <label class="text-label" :class="errors ? 'label-errors' : ''" for="name">{{
      labelName
    }}</label>
    <div class="icon" @click="showPassword" v-if="labelName === 'Password'">
      <img v-show="showEye" src="@/assets/icons/Eye.svg" alt="" />
      <img v-show="!showEye" src="@/assets/icons/Eye-Off.svg" alt="" />
    </div>
  </div>
</template>

<script src="./Input.js"></script>

<style src="./Input.scss" lang="scss"></style>
