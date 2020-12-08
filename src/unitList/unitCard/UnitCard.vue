<template>
  <div>
    <img :src="unit.image" alt="Unit Image" />
    {{ unit.crater }}
    (#{{ unit.id }})
    <div>
      <div>Capsules: {{ unit.facilities.capsules }}</div>
      <div>Sterializers: {{ unit.facilities.sterializers }}</div>
      <div>Size: {{ unit.facilities.size }}</div>
    </div>
  </div>
</template>

<script src="./UnitCard.js"></script>

<style lang="scss" src="./UnitCard.scss"></style>
