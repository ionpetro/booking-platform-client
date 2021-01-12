<template>
  <div class="home">
    <v-recommendation v-if="authenticated" class="home__recommendation"></v-recommendation>
    <section class="home__main">
      <div class="home__main__intro">
        <div>
          <div class="home__main__intro__title animateIntro">
            We are giving you <br />
            the space you need
          </div>
          <v-button
            class="home__main__intro__button animateIntro"
            @click.native="viewUnits"
            :variant="'secondary'"
            >Explore units</v-button
          >
        </div>
      </div>
      <div>
        <img class="home__main__image" src="@/assets/images/Units.png" alt="Units" />
      </div>
    </section>
    <section class="home__partnerships">
      <h1 class="home__partnerships__h1">Partnerships</h1>
      <div class="home__partnerships__images">
        <img
          class="home__partnerships__images__image home__partnerships__images__nasa"
          src="@/assets/images/Nasa.png"
          alt="Nasa"
        />
        <img
          class="home__partnerships__images__image"
          src="@/assets/images/SpaceX.png"
          alt="SpaceX"
        />
        <img class="home__partnerships__images__image" src="@/assets/images/Eesa.png" alt="Eesa" />
        <img
          class="home__partnerships__images__image"
          src="@/assets/images/ArianeGroup.png"
          alt="ArianeGroup"
        />
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>

<script src="./Home.js"></script>

<style lang="scss" src="./Home.scss" scoped></style>
