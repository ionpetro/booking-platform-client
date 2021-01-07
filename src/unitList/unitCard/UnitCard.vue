<template>
  <div class="card">
    <div class="card__image card__image--zoom">
      <img :src="unit.image" alt="Unit Image" />
    </div>
    <div class="card__info">
      <div class="card__price">
        <span class="body--small card__price__discount" v-if="hasDiscount">{{ unit.price }}</span>
        <span class="body--large card__price__amount"
          >{{ unit.discountedPrice }}
          <img src="@/assets/icons/Bitcoin.svg" alt="Bitcoin icon" />
        </span>
      </div>
      <div class="card__location">
        {{ unit.crater }}, {{ unit.address }}
        <span class="card__info__distance">• {{ unit.distance }}pt from center</span>
      </div>
      <div class="card__characteristics">
        <div v-if="unit.capsules">
          <img src="@/assets/icons/Capsules.svg" alt="Capsules" /><span> {{ unit.capsules }}</span>
        </div>
        <div v-if="unit.sterilizers">
          <img src="@/assets/icons/Sterilizers.svg" alt="sterilizers" /><span>
            {{ unit.sterilizers }}</span
          >
        </div>
        <div v-if="unit.size">
          <img src="@/assets/icons/Size.svg" alt="Size" />
          <span> {{ unit.size }}mf</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./UnitCard.js"></script>

<style lang="scss" src="./UnitCard.scss" scoped></style>
