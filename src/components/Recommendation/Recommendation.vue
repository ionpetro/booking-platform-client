<template>
  <div class="recommendation">
    <div :class="['recommendation__features', loading ? 'tablet__display' : 'tablet__hide']">
      <div class="recommendation__features__trancate--top"></div>
      <div class="recommendation__features__trancate--bot"></div>
      <div class="recommendation__features__feature p1">
        <span>🥂 Definitely luxurious</span>
      </div>
      <div class="recommendation__features__feature p2"><span>📡 Fast connections </span></div>
      <div class="recommendation__features__feature p3"><span>🪐 Stunning view</span></div>
      <div class="recommendation__features__feature p4">
        <span>👽 Extra alien security</span>
      </div>
    </div>
    <div class="recommendation__unit">
      <div class="recommendation__unit__loader">
        <beat-loader v-if="loading" color="#0F1A3A" :size="20" sizeUnit="px"></beat-loader>
      </div>
      <transition name="fade">
        <div class="recommendation__unit__desc" v-if="!loading">
          <img
            class="recommendation__unit__desc__img"
            src="@/assets/images/RecommendationUnit.png"
            alt="Recommendation Unit"
          />
          <h1 class="recommendation__unit__desc__h1">Your perfect match!</h1>
          <p class="recommendation__unit__desc__p">
            After analyzing your thoughts and emotions, we found your ideal apartment!
            <br class="break" />
            Bright, luxurius with wide areas to invite your colleagues and friends.
          </p>
          <v-button
            @click.native="viewUnit"
            class="recommendation__unit__desc__button"
            :variant="'secondary'"
            >View this unit</v-button
          >
        </div>
      </transition>
    </div>
  </div>
</template>

<script src="./Recommendation.js"></script>
<style lang="scss" src="./Recommendation.scss" scoped></style>
