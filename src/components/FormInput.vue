<template>
  <div>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
export default {
  props: ["modelValue"],
  emits: ["update:modelValue"],
};
</script>

<style lang="scss" scoped>
input {
  width: 100%;
  padding: 0 20px;
  border: 0;
  background-color: #edf2ec;
  border-radius: 10px;
  outline-color: #529d41;
  height: 50px;
}
</style>