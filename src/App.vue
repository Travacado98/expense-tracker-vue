
<template>
  <div id="site">
    <div id="card-container">
      <div id="headers">
        <h1>Expense Tracker</h1>
        <div id="total-amount">
          <h4>Total:</h4>
          <span
            id="total"
            :class="{ positive: total > 0, negative: total < 0 }"
            >{{ formatCurrency(total) }}</span
          >
        </div>
      </div>

      <div class="card">
        <add-expense-form />
        <expense-list
          :list="expenseList"
          :formatter="formatter"
          @edit="openEditModal"
        />
      </div>
    </div>

    <edit-expense-modal
      v-if="showEditModal"
      :expense-item="showEditModal"
      @close="showEditModal = false"
    />

    <div id="footer">
      <span>A project by </span>
      <a href="http://travissmith.xyz">
        <span id="link">Travis Smith</span>
      </a>
    </div>
  </div>
</template>

<script>
import { query, collection, onSnapshot } from "firebase/firestore";
import AddExpenseForm from "@/components/AddExpenseForm.vue";
import ExpenseList from "@/components/ExpenseList.vue";
import EditExpenseModal from "@/components/EditExpenseModal.vue";

export default {
  components: {
    AddExpenseForm,
    ExpenseList,
    EditExpenseModal,
  },

  data() {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    return {
      formatter,
      expenseList: [],
      showEditModal: false,
    };
  },
  mounted() {
    this.getExpenses();
  },
  computed: {
    total() {
      let total = 0;

      this.expenseList.forEach((expenseObj) => {
        total += expenseObj.amount;
      });

      return total;
    },
  },
  methods: {
    formatCurrency(amount) {
      return this.formatter.format(amount);
    },

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

    openEditModal(expenseItem) {
      this.showEditModal = expenseItem;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/scss/variables";

#headers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  max-width: 1320px;

  h1 {
    display: flex;
    align-items: center;
    font-size: 42px;
    width: 100%;
    margin: 40px 0 20px 0;
  }

  #total-amount {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 40px 0 20px 0;
    width: 100%;

    h4 {
      display: flex;
      align-items: flex-end;
      margin: 0;
    }

    span {
      font-size: 42px;
      font-family: monospace;
      margin-left: 10px;
    }
  }
}
.card {
  background-color: white;
  padding: 20px;
  max-width: 1320px;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  width: 100%;
}
#footer {
  margin-top: 20px;
  color: #a7bca3;
  font-size: 14px;

  a {
    text-decoration: none;
  }

  #link {
    color: #a7bca3;

    &:hover {
      color: #529d41;
    }
    &:visited {
      text-decoration: none;
      color: #a7bca3;
    }
  }
}

#card-container {
  margin: 0 20px;
}

#site {
  background-color: #f0fded;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
