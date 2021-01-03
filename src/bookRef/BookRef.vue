<template>
  <div class="book-ref">
    <div @click="back" class="book-ref__container">
      <img
        class="book-ref__container__remove"
        src="@/assets/icons/Remove.svg"
        alt="Close drawer button"
      />
    </div>
    <h1 class="book-ref__title">Your booking is confirmed!</h1>
    <h4 class="book-ref__details">Details will be send to your email</h4>
    <img class="book-ref__image" src="@/assets/images/Mars.png" alt="Mars" />
  </div>
</template>

<script src="./BookRef.js"></script>

<style src="./BookRef.scss" lang="scss" scoped></style>
