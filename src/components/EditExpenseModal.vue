<template>
  <modal title="Edit Expense" @close="$emit('close')">
    <form @submit.prevent="editExpense">
      <form-input
        v-model="editForm.name"
        type="text"
        @input="checkFormValidity"
      />

      <form-input
        v-model="editForm.amount"
        type="number"
        step=".01"
        @input="checkFormValidity"
      />

      <form-input v-model="editForm.date" type="date" />

      <btn type="submit" icon="save"> Save Expense </btn>
      <btn
        type="button"
        @click="deleteExpense(expenseItem._id)"
        icon="delete"
        class="delete"
      >
        Delete
      </btn>
    </form>
  </modal>
</template>

<script>
import moment from "moment";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import Modal from "@/components/Modal.vue";

export default {
  props: { expenseItem: Object },

  emits: ["close"],

  components: {
    Modal,
  },

  data() {
    return {
      editForm: {
        name: "",
        amount: "",
        date: "",
        submitted: false,
      },
    };
  },

  mounted() {
    this.setEditForm();
  },

  methods: {
    deleteExpense(id) {
      if (confirm("Do you really want to delete?") === true) {
        deleteDoc(doc(this.$db, "expenses", id));
        this.$emit("close");
      }
    },
    editExpense() {
      this.editForm.submitted = true;

      if (!this.checkFormValidity()) return;

      const { name, amount, date } = this.editForm;

      const expenseObj = {
        name,
        amount: parseFloat(amount),
        date: date ? new Date(`${date} 00:00`).toDateString() : null,
      };

      updateDoc(doc(this.$db, "expenses", this.editForm._id), {
        ...expenseObj,
        date: date ? new Date(expenseObj.date) : null,
      });

      this.editForm.name = "";
      this.editForm.amount = "";
      this.editForm.date = "";

      this.editForm.submitted = false;
      this.$emit("close");
    },

    setEditForm() {
      this.editForm._id = this.expenseItem._id;
      this.editForm.name = this.expenseItem.name;
      this.editForm.amount = this.expenseItem.amount;

      this.editForm.date = this.expenseItem.date
        ? moment(new Date(this.expenseItem.date)).format("YYYY-MM-DD")
        : "";
    },

    checkFormValidity() {
      if (!this.editForm.submitted) return true;

      const { name, amount } = this.editForm;

      return name && amount;
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}
</style>