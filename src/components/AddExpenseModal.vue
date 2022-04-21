<template>
  <modal title="Add Expense" @close="$emit('close')">
    <add-expense-form @close="$emit('close')" />
  </modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import AddExpenseForm from "@/components/AddExpenseForm.vue";

export default {
  emits: ["close"],

  components: {
    Modal,
    AddExpenseForm,
  },
};
</script>
