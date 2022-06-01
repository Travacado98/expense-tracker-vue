<template>
  <div class="add-expense-mobile-footer">
    <btn icon="add_circle" @click="openAddModal">Add Expense</btn>
    <add-expense-modal v-if="showAddModal" @close="showAddModal = false" />
  </div>
</template>

<script>
import AddExpenseModal from "@/components/AddExpenseModal.vue";

export default {
  components: {
    AddExpenseModal,
  },

  data() {
    return {
      showAddModal: false,
    };
  },

  methods: {
    openAddModal() {
      this.showAddModal = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/variables";

.add-expense-mobile-footer {
  @media ($desktop) {
    display: none;
  }

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
}
</style>
