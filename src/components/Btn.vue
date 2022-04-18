<template>
  <button>
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
button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #529d41;
  width: 100%;
  padding: 0 20px;
  border: 0;
  border-radius: 10px;
  color: white;

  .material-icons {
    margin-right: 12px;
  }

  &.delete {
    background-color: #484545;
  }
  &.secondary {
    background-color: #edf2ec;
    color: #454845;
  }

  &:hover {
    background-color: #2d6c1f;
    cursor: pointer;

    &.delete {
      background-color: #e04545;
    }
    &.secondary {
      background-color: #c9d1c8;
    }
  }
}
</style>