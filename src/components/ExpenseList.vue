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
      @click="selectRow(expenseItem)"
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
      <span class="date-span">{{ expenseItem.date }}</span>

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
    selectRow(expenseItem) {
      if (window.innerWidth <= 900) {
        this.editExpense(expenseItem);
      }
    },

    deleteExpense(id) {
      if (confirm("Do you really want to delete?") === true) {
        deleteDoc(doc(this.$db, "expenses", id));
      }
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
@import "@/scss/variables";

.label-container {
  @media ($mobile) {
    display: none;
  }

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
  @media ($mobile) {
    grid-template-columns: 2fr 1fr;
    gap: 5px 20px;
    padding: 10px;
    cursor: pointer;

    &:hover {
      background-color: #edf2ec;
      border-radius: 10px;
    }
  }
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 10px 0;
}

.date-span {
  @media ($mobile) {
    color: #afb7ae;
    font-size: 12px;
  }
}

.amount-span {
  @media ($mobile) {
  }
  text-align: right;
  font-family: "Space Mono";
}
.button-row {
  @media ($mobile) {
    display: none;
    position: absolute;
    bottom: 0px;
  }
  @media ($tablet) {
    flex-wrap: wrap;
  }
  display: flex;
  gap: 10px;

  button {
    @media ($tablet) {
      width: 100%;
    }
    width: 50%;
  }
}
</style>