<template>
  <nav :class="['nav', 'body--large', scrollPosition ? 'nav__scrolled' : '']">
    <img class="nav__logo" src="@/assets/images/blue.png" alt="LogoBlue" />
    <div @click="toggleMobileNav" :class="['nav__icon', openMobileNav ? 'active' : '']">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
    <div :class="['nav__links', openMobileNav ? 'nav__mobile-nav' : '']">
      <div v-if="user" class="nav__links__link nav__mobile nav__links__link--white">
        <strong>Hello, {{ user.firstName }}</strong>
      </div>
      <div class="nav__links__link">
        <router-link @click.native="toggleMobileNav" to="/">Home</router-link>
      </div>
      <div class="nav__links__link">
        <router-link @click.native="toggleMobileNav" to="/units">Units</router-link>
      </div>
      <hr class="nav__mobile nav__links__line" />
      <div v-if="user" class="nav__links__link nav__mobile"><a @click="logOut">Log out</a></div>
      <div v-else class="nav__links__link nav__mobile">
        <router-link v-if="!user" to="/login">Login</router-link>
      </div>
    </div>
    <div class="nav__login" v-click-outside="closeDropdown">
      <router-link v-if="!user" to="/login">Login</router-link>
      <div v-else class="nav__login__dropdown">
        <div class="nav__login__dropdown__title" @click.prevent="toggleDropdown">
          <span class="nav__login__dropdown__title__name" to="/units">{{ user.firstName }}</span>
          <img
            :class="
              showDropDown
                ? 'nav__login__dropdown__title__arrow__reverse'
                : 'nav__login__dropdown__title__arrow__reset'
            "
            src="@/assets/icons/Dropdown.svg"
            alt="arrow"
          />
        </div>
        <transition name="fade">
          <div v-if="showDropDown" class="nav__login__dropdown__body" @click="logOut">
            <img src="@/assets/icons/Logout.svg" alt="Logout" />
            <span>Logout</span>
          </div>
        </transition>
      </div>
    </div>
  </nav>
</template>

<script src="./Navigation.js"></script>

<style lang="scss" src="./Navigation.scss" scoped></style>
