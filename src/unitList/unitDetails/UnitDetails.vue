<template>
  <div class="details">
    <transition name="fade">
      <v-message class="details__error" :type="'error'" v-if="message">{{ message }}</v-message>
    </transition>
    <div v-if="loading" class="details__container">
      <beat-loader
        class="details__container__loader"
        color="gray"
        :size="20"
        sizeUnit="px"
      ></beat-loader>
    </div>
    <div v-if="unit">
      <img class="details__img__container" :src="unit.image" :alt="`unit image ${unit.image}`" />
      <!-- Title -->
      <h3>{{ unit.crater }}, {{ unit.address }}</h3>
      <!-- Basic Characteristics -->
      <div class="details__characteristics">
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
          <span> {{ unit.size }} mf</span>
        </div>
        <div v-if="unit.distance">
          <img src="@/assets/icons/Portals.svg" alt="Portals" />
          <span>{{ unit.distance }} portals</span>
        </div>
      </div>
      <!-- Amenities -->
      <h5>Amenities</h5>
      <div v-if="unit.amenities" class="details__amenities">
        <div
          class="details__amenity"
          v-for="(amenity, index) of unit.amenities"
          :key="`amenity%${index}`"
        >
          <img :src="require(`@/assets/images/${amenity}.png`)" :alt="amenity" />
          <span>{{ amenity }}</span>
        </div>
      </div>
      <div v-else>No amenities</div>
      <!-- Crater Description -->
      <h5>Crater</h5>
      <div v-if="unit.imageCrater" class="details__crater">
        <img :src="unit.imageCrater" alt="Crater Image" />
        <p>{{ unit.descriptionCrater }}</p>
      </div>
      <div v-else>No crater details</div>
      <!-- Benefits -->
      <h5>Crater benefits</h5>
      <div v-if="unit.benefits" class="details__benefits">
        <div
          class="details__benefit"
          v-for="(benefit, index) of unit.benefits"
          :key="`benefit%${index}`"
        >
          <img :src="require(`@/assets/icons/${benefit}.svg`)" :alt="benefit" />
          <span class="body--large">{{ benefit }}</span>
        </div>
      </div>
      <div v-else>No crater benefits</div>
      <div class="details--bottomSpacing"></div>
      <!-- Book Layout -->
      <div class="details__book">
        <UnitBook @onErrorMessage="bookingError" :unit="unit"></UnitBook>
      </div>
    </div>
  </div>
</template>

<script src="./UnitDetails.js"></script>

<style lang="scss" src="./UnitDetails.scss" scoped></style>
