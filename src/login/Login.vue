<template>
  <transition name="fade">
    <div class="login" v-if="show">
      <div class="hero-container">
        <img class="hero" src="@/assets/images/hero.png" alt="hero" />
        <img class="hero-big" src="@/assets/images/hero-big.png" alt="hero-big" />
      </div>
      <div class="content">
        <img class="logo" src="@/assets/images/blue.png" alt="logo" />
        <h1 class="heading">Welcome Back</h1>
        <transition name="fade">
          <v-message type="error" v-if="message">{{ message }}</v-message>
        </transition>
        <form name="form" @submit.prevent="handleLogin">
          <div id="username">
            <v-input
              class="username"
              name="username"
              labelName="Username"
              type="text"
              :errors="errors.username"
              placeholder="ex. joe@2020.co"
              v-model="user.username"
              @focused="deleteError('username')"
            ></v-input>
            <div class="errors" v-if="errors.username">{{ errors.username }}</div>
          </div>
          <div id="password">
            <v-input
              class="password"
              name="password"
              labelName="Password"
              placeholder="Fill your password here.."
              type="password"
              :errors="errors.password"
              v-model="user.password"
              @focused="deleteError('password')"
            ></v-input>
            <div class="errors" v-if="errors.password">{{ errors.password }}</div>
          </div>
          <div id="remember">
            <label @click="clickCheckbox" class="checkbox">
              <span class="checkbox__input">
                <input type="checkbox" name="checkbox" />
                <span class="checkbox__control">
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 9 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.16583 0.833374L3.24746 7.85928C3.11582 8.04845 2.90126 8.1628 2.67083 8.16661C2.44039 8.17042 2.22218 8.06322 2.08435 7.87851L0.833252 6.21059"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </span>
              <span class="checkbox__text">Remember me</span>
            </label>
          </div>
          <v-button class="btn button--margin" variant="primary"
            ><span v-if="!loading">Login</span>
            <span>
              <beat-loader v-if="loading" color="white" :size="10" sizeUnit="px"></beat-loader>
            </span>
          </v-button>
        </form>
      </div>
    </div>
  </transition>
</template>

<script src="./Login.js"></script>

<style src="./Login.scss" lang="scss"></style>
