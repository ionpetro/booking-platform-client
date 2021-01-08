<template>
  <div class="book">
    <div class="book__container">
      <div class="book__container__price">
        <span class="body--small book__container__price__discount" v-if="hasDiscount">{{
          unit.price
        }}</span>
        <span class="body--large book__container__price__amount"
          >{{ unit.discountedPrice }}
          <img src="@/assets/icons/Bitcoin.svg" alt="Bitcoin icon" />
        </span>
      </div>
      <div class="book__form">
        <UnitBookDate @onSelectedYear="yearSelected" :unit="unit"></UnitBookDate>
        <v-button @click.native="bookUnit" :disabled="!selectedYear" class="btn" variant="secondary"
          >Book</v-button
        >
      </div>
    </div>
  </div>
</template>

<script src="./UnitBook.js"></script>

<style lang="scss" src="./UnitBook.scss" scoped></style>
