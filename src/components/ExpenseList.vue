<template>
  <div class="label-container">
    <label>Name</label>
    <label id="amount-label">Amount</label>
    <label>Due Date</label>
  </div>

  <div id="expenseList">
    <div
      v-for="expenseItem in list"
      :key="expenseItem._id"
      class="expense-item"
      :id="expenseItem._id"
    >
      <span>{{ expenseItem.name }}</span>
      <span
        :class="[
          'amount-span',
          {
            positive: expenseItem.amount > 0,
            negative: expenseItem.amount < 0,
          },
        ]"
        >{{ formatCurrency(expenseItem.amount) }}</span
      >
      <span>{{ expenseItem.date }}</span>
      <div class="button-row">
        <btn @click="editExpense(expenseItem)" icon="edit" class="secondary">
          Edit
        </btn>
        <btn
          @click="deleteExpense(expenseItem._id)"
          icon="delete"
          class="delete"
        >
          Delete
        </btn>
      </div>
    </div>
  </div>
</template>

<script>
import { doc, deleteDoc } from "firebase/firestore";
export default {
  props: {
    list: Array,
    formatter: Object,
  },
  emits: ["edit"],
  methods: {
    deleteExpense(id) {
      deleteDoc(doc(this.$db, "expenses", id));
    },
    formatCurrency(amount) {
      return this.formatter.format(amount);
    },
    editExpense(expenseItem) {
      this.$emit("edit", expenseItem);
    },
  },
};
</script>

<style lang="scss" scoped>
.label-container {
  padding: 10px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: space-between;
  gap: 20px;
  font-size: 14px;
  color: #afb7ae;

  #amount-label {
    text-align: right;
  }

  label {
    width: 100%;
  }
}
.expense-item {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 10px 0;
}

.amount-span {
  text-align: right;
  font-family: monospace;
}
.button-row {
  display: flex;
  gap: 10px;

  button {
    width: 50%;
  }
}
</style>