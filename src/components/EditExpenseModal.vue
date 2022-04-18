<template>
  <div class="modal" id="edit-modal">
    <div class="modal-content">
      <form @submit.prevent="editExpense">
        <div id="modal-children">
          <h2 id="modal-text">
            Edit Expense
            <span class="material-icons" @click="$emit('close')"> close </span>
          </h2>

          <input
            v-model="editForm.name"
            id="edit-name"
            type="text"
            @input="checkFormValidity"
          />

          <input
            v-model="editForm.amount"
            id="edit-amount"
            type="number"
            step=".01"
            @input="checkFormValidity"
          />

          <input v-model="editForm.date" id="edit-date" type="date" />

          <btn id="modal-button" type="submit" icon="save"> Save Expense </btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { doc, updateDoc } from "firebase/firestore";

export default {
  props: { expenseItem: Object },

  emits: ["close"],

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
.modal {
  position: fixed;
  display: flex;
  background-color: #0004;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  h2 {
    margin: 0;
  }

  #modal-text {
    display: flex;
    align-items: center;
    justify-content: space-between;

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
    min-width: 600px;
    #modal-children {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;

      input {
        padding: 0 20px;
        border: 0;
        background-color: #edf2ec;
        border-radius: 10px;
        outline-color: #529d41;
        height: 50px;
      }
    }
  }
}
</style>