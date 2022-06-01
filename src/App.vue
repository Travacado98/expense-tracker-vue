<template>
  <div class="site">
    <div class="card-container">
      <site-header :expense-list="expenseList" />

      <div class="card">
        <add-expense-form />
        <expense-list :list="expenseList" />
      </div>
    </div>

    <site-footer />

    <add-expense-mobile-footer />
  </div>
</template>

<script>
import { query, collection, onSnapshot } from "firebase/firestore";

import AddExpenseForm from "@/components/AddExpenseForm.vue";
import AddExpenseMobileFooter from "@/components/AddExpenseMobileFooter.vue";
import ExpenseList from "@/components/ExpenseList.vue";
import SiteFooter from "@/components/SiteFooter.vue";
import SiteHeader from "@/components/SiteHeader.vue";

export default {
  components: {
    AddExpenseForm,
    AddExpenseMobileFooter,
    ExpenseList,
    SiteFooter,
    SiteHeader,
  },

  data() {
    return {
      expenseList: [],
    };
  },

  mounted() {
    this.getExpenses();
  },

  methods: {
    getExpenses() {
      const q = query(collection(this.$db, "expenses"));

      onSnapshot(q, (querySnapshot) => {
        this.expenseList = [];

        querySnapshot.forEach((doc) => {
          const date = doc.data().date;

          const expenseObj = {
            ...doc.data(),
            _id: doc.id,
            date: date ? date.toDate().toDateString() : null,
          };

          this.expenseList.push(expenseObj);
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/variables";

.site {
  @media ($mobile) {
    width: 100%;
    display: block;
  }

  background-color: $background;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-container {
  margin: 0 20px;
}

.card {
  background-color: white;
  padding: 20px;
  max-width: 1320px;
  box-shadow: $shadow;
  border-radius: 10px;
  width: 100%;
}

.add-expense-form {
  @media ($mobile) {
    display: none;
  }
}
</style>
