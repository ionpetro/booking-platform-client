<template>
  <div>
    <h1>UnitList</h1>
    <a href @click.prevent="logOut">Logout</a>
    <v-message :type="'error'" v-if="message">{{ message }}</v-message>
    <div v-for="unit of units" :key="unit.id">
      <UnitCard :unit="unit"></UnitCard>
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
