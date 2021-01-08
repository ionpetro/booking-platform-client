<template>
  <div>
    <transition name="fade">
      <v-message class="list__error" :type="'error'" v-if="message">{{ message }}</v-message>
    </transition>
    <Drawer v-if="isDrawerOpened" @onDrawerClosed="onDrawerClosed"
      ><UnitDetails :selectedUnitId="selectedUnitId"></UnitDetails
    ></Drawer>
    <div class="list">
      <div
        v-for="unit of units"
        :key="unit.id"
        class="list__card"
        tabindex="0"
        @click="openDrawer(unit.id)"
      >
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

<style lang="scss" src="./UnitList.scss" scoped></style>
