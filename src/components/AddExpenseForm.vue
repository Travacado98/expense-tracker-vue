<template>
  <form @submit.prevent="addExpense">
    <div id="input-container">
      <input
        v-model="form.name"
        id="add-name"
        type="text"
        placeholder="Name*"
        :class="{ invalid: form.submitted && !form.name }"
        @input="checkFormValidity"
      />

      <input
        v-model="form.amount"
        id="add-amount"
        type="number"
        step=".01"
        placeholder="Amount*"
        :class="{ invalid: form.submitted && !form.amount }"
        @input="checkFormValidity"
      />

      <input
        v-model="form.date"
        id="add-date"
        type="text"
        placeholder="Due Date"
        onfocus="(this.type='date')"
      />

      <btn id="add-button" type="submit" icon="add_circle"> Add Expense </btn>
    </div>
  </form>
</template>

<script>
import { collection, addDoc } from "firebase/firestore";

export default {
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
    },
  },
};
</script>

<style lang="scss" scoped>
#input-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  place-content: center;
  gap: 20px;
  padding-bottom: 10px;
  input {
    padding: 0 20px;
    border: 0;
    background-color: #edf2ec;
    border-radius: 10px;
    outline-color: #529d41;
  }
}
</style>