<template>
  <button class="btn">
    <span class="material-icons">{{ icon }}</span>
    <slot />
  </button>
</template>

<script>
export default {
  props: { icon: String },
};
</script>

<style lang="scss" scoped>
@import "@/scss/variables";

button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: $green;
  width: 100%;
  padding: 0 20px;
  border: 0;
  border-radius: 10px;
  color: white;
  cursor: pointer;

  .material-icons {
    margin-right: 12px;
  }

  &.delete {
    background-color: $black;
  }

  &.secondary {
    background-color: $input;
    color: $black;
  }

  &:hover {
    background-color: $clickgreen;

    &.delete {
      background-color: $red;
    }

    &.secondary {
      background-color: #c9d1c8;
    }
  }
}
</style>
