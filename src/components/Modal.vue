<template>
  <div class="modal">
    <div class="modal-content">
      <h2 class="modal-title">
        {{ title }}
        <span class="material-icons" @click="$emit('close')"> close </span>
      </h2>

      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
  emits: ["close"],
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  display: flex;
  background-color: #0004;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  padding: 20px;

  .modal-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0;

    span {
      &:hover {
        cursor: pointer;
      }
    }
  }

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    max-width: 600px;
  }
}
</style>