<template>
  <form class="add-expense-form" @submit.prevent="addExpense">
    <form-input
      v-model="form.name"
      type="text"
      placeholder="Name*"
      :class="{ invalid: form.submitted && !form.name }"
      @input="checkFormValidity"
    />

    <form-input
      v-model="form.amount"
      type="number"
      step=".01"
      placeholder="Amount*"
      :class="{ invalid: form.submitted && !form.amount }"
      @input="checkFormValidity"
    />

    <form-input
      v-model="form.date"
      type="text"
      placeholder="Due Date"
      onfocus="(this.type='date')"
    />

    <btn type="submit" icon="add_circle"> Add Expense </btn>
  </form>
</template>

<script>
import { collection, addDoc } from "firebase/firestore";

export default {
  emits: ["close"],

  data() {
    return {
      form: {
        name: "",
        amount: "",
        date: "",
        submitted: false,
      },
    };
  },

  methods: {
    checkFormValidity() {
      if (!this.form.submitted) return true;

      const { name, amount } = this.form;

      return name && amount;
    },

    async addExpense() {
      this.form.submitted = true;

      if (!this.checkFormValidity()) return;

      const { name, amount, date } = this.form;

      const expenseObj = {
        name,
        amount: parseFloat(amount),
        date: date ? new Date(`${date} 00:00`).toDateString() : null,
      };

      addDoc(collection(this.$db, "expenses"), {
        ...expenseObj,
        date: date ? new Date(expenseObj.date) : null,
      });

      this.form.name = "";
      this.form.amount = "";
      this.form.date = "";

      this.form.submitted = false;

      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/variables";

form {
  @media ($mobile) {
    grid-template-columns: 1fr;
  }

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  place-content: center;
  gap: 20px;
  padding-bottom: 10px;
}
</style>