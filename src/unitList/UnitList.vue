<template>
  <div>
    <a href @click.prevent="logOut">Logout</a>
    <transition name="fade">
      <v-message class="list__error" :type="'error'" v-if="message">{{ message }}</v-message>
    </transition>
    <div class="list">
      <div v-for="unit of units" :key="unit.id" class="list__card">
        <UnitCard :unit="unit"></UnitCard>
      </div>
    </div>
    <div
      class="visibilityElement"
      v-if="units.length"
      v-observe-visibility="{
        callback: visibilityChanged,
        throttle: 200
      }"
    ></div>
  </div>
</template>

<script src="./UnitList.js"></script>

<style lang="scss" src="./UnitList.scss"></style>
