<template>
  <div class="form-group">
    <input
      :value="value"
      :type="customType"
      class="text-input"
      :placeholder="placeholder"
      :class="errors ? 'input-errors' : ''"
      @input="$emit('input', $event.target.value)"
      @focus="$emit('focused', labelName)"
    />
    <label class="text-label" :class="errors ? 'label-errors' : ''" for="name">{{
      labelName
    }}</label>
    <div class="icon" @click="showPassword" v-if="labelName === 'Password'">
      <img v-show="showEye" src="@/assets/icons/Eye.svg" alt="" />
      <img v-show="!showEye" src="@/assets/icons/Eye-Off.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showEye: true,
      customType: this.type
    };
  },
  props: {
    value: {
      required: true,
      type: String
    },
    name: {
      required: true,
      type: String
    },
    labelName: {
      required: true,
      type: String
    },
    errors: {
      required: false,
      type: [String || null]
    },
    placeholder: {
      required: true,
      type: String
    },
    type: {
      required: true,
      default: 'text',
      type: String
    }
  },
  methods: {
    // toggle password input
    showPassword() {
      if (this.name === 'password') {
        if (this.customType === 'password') {
          this.customType = 'text';
          this.showEye = !this.showEye;
        } else {
          this.customType = 'password';
          this.showEye = !this.showEye;
        }
      }
    }
  }
};
</script>

<style lang="scss">
.form-group {
  position: relative;
}
// text and password input
.text-input {
  background: #ffffff;

  /* Gray/ dim */
  border: 1px solid $gray-dim;
  box-sizing: border-box;
  height: 56px;
  width: 480px;
  padding-left: 1.5em;
  border-radius: 20px;
  color: $secondary;
  // font-size: $base-font-size;
  font-size: 1rem;
  margin-top: 55px;

  &:focus {
    border: 1px solid $secondary;
    outline: none;
    & + label {
      color: $secondary !important;
    }
  }
}
// text and password label
.text-label {
  color: $gray-dim;
  position: absolute;
  z-index: 1;
  left: 17px;
  top: 45px;
  padding: 0 8px;
  background-color: white;
  font-size: 0.8rem;
}

.input-errors {
  border: 1px solid $red-medium;
}

.label-errors {
  color: $red-medium;
}

//checkbox input
[type='checkbox']:not:checked,
[type='checkbox']:checked {
  border: 2px solid black;
}

.icon {
  position: absolute;
  // input width - (icon width + distance from edge)
  left: #{480- (24+25)}px;
  bottom: 10px;
}
</style>
