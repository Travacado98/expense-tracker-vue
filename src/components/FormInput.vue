<template>
  <input
    :value="modelValue"
    :class="{ invalid }"
    @input="$emit('update:modelValue', $event.target.value)"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  props: {
    modelValue: String,
    invalid: Boolean,
  },
  emits: ["update:modelValue"],
};
</script>

<style lang="scss" scoped>
@import "@/scss/variables";

input {
  background-color: $input;
  width: 100%;
  padding: 0 20px;
  border: solid 2px transparent;
  outline: 0;
  border-radius: 10px;
  height: 50px;

  &:focus {
    border-color: $green;
  }

  &.invalid {
    border-color: $red;
  }
}
</style>
