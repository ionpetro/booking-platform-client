<template>
  <div class="bookDate" v-click-outside="hideModal">
    <div class="bookDate__input">
      <img class="bookDate__input__calendar" src="@/assets/icons/Calendar.svg" alt="Calendar" />
      <img
        :class="['testArrow', show ? 'bookDate__input__reset' : 'bookDate__input__reverse']"
        src="@/assets/icons/Arrow.svg"
        alt="Arrow"
        @click="toggleModal"
      />
      <input
        class="bookDate__input__text"
        :value="selectedYear"
        placeholder="YYYY"
        @click.prevent="toggleModal"
        readonly
      />
      <label class="bookDate__label body--small" for="">Year</label>
    </div>
    <transition name="fade">
      <div v-if="show">
        <div class="bookDate__modal">
          <span
            v-for="(year, index) of years"
            :key="`year${index}`"
            @click="selectYear(year)"
            :class="[
              'bookDate__modal__year',
              disabledYears(year) ? 'bookDate__modal__year--disabled' : '',
              year === selectedYear ? 'bookDate__modal__year--selected' : ''
            ]"
            tabindex="0"
            >{{ year }}</span
          >
        </div>
      </div>
    </transition>
  </div>
</template>

<script src="./UnitBookDate.js"></script>

<style lang="scss" src="./UnitBookDate.scss" scoped></style>
