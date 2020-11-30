<template>
  <div id="login">
    <div>
      <img class="hero" src="@/assets/images/hero.png" alt="hero" />
    </div>
    <div class="content">
      <img class="logo" src="@/assets/images/blue.png" alt="logo" />
      <h1 class="heading">Welcome Back</h1>
      <v-message :type="'error'" v-if="message">{{ message }}</v-message>
      <form name="form" @submit.prevent="checkForm">
        <div id="username">
          <v-input
            :name="'username'"
            :labelName="'Username'"
            :type="'text'"
            :errors="errors.username"
            :placeholder="'ex. joe@2020.co'"
            v-model="user.username"
            @focused="deleteErrors"
          ></v-input>
          <div class="errors" v-show="errors.hasOwnProperty('username')">{{ errors.username }}</div>
        </div>
        <br />
        <div id="password">
          <v-input
            :name="'password'"
            :labelName="'Password'"
            :placeholder="'Fill your password here..'"
            :type="'password'"
            :errors="errors.password"
            v-model="user.password"
            @focused="deleteErrors"
          ></v-input>
          <div class="errors" v-show="errors.hasOwnProperty('password')">{{ errors.password }}</div>
        </div>
        <div id="remember">
          <label @click="remember = !remember" class="checkbox">
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
        <v-button class="button" :size="'regular'" :variant="'primary'">Login</v-button>
      </form>
    </div>
  </div>
</template>

<script src="./Login.js"></script>

<style src="./Login.scss" lang="scss"></style>
