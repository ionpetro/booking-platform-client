<template>
  <div class="book-ref">
    <div @click="back" class="book-ref__icon">
      <img src="@/assets/icons/Remove.svg" alt="Close drawer button" />
    </div>
    <div class="book-ref__container">
      <h1 class="book-ref__container__title">Your booking is confirmed!</h1>
      <h4 class="book-ref__container__details">Details will be send to your email</h4>
      <p v-if="!display" @click="show" class="book-ref__container__show-details">
        View crater details
      </p>
    </div>
    <div class="book-ref__planet">
      <canvas id="planet-canvas" class="book-ref__planet__canvas"> </canvas>
      <div
        :class="[
          'book-ref__planet__annotation',
          display ? '' : 'book-ref__planet__annotation--hide'
        ]"
      >
        <div class="book-ref__planet__annotation__close" href="#" @click="hide"></div>
        <p class="book-ref__planet__annotation__title">
          <span v-if="!crater">Crater</span>
          {{ crater }}
        </p>
        <p class="bookRef__planet__annotation__body">
          <span v-if="!craterDescription">Crater Description</span>

          {{ craterDescription }}
        </p>
      </div>
    </div>
  </div>
</template>

<script src="./BookRef.js"></script>

<style src="./BookRef.scss" lang="scss" scoped></style>
