


<template>
  <!-- HOMEWORK

    fix the padding on bottom √
    nunmber alignment on mobile √
    add delete button to edit modal on mobile only √
    add confirm on delete (are you sure?) √
    update the number font SpaceMono √
    use variables for all colors ?
    use variable for padding gap margin and fractions (gap/2) ?
    update page title (browser tab) √
    update favicon √
    update mobile breakpoint to 900 √
    fix total alignment √
    clean up code formatting √
    
    bonus: 
    fix table grid alignment problem on medium screen size (addtional breakpoint? grid wrap?) √?


 -->
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

    <add-expense-modal v-if="showAddModal" @close="showAddModal = false" />

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

    <div id="add-mobile">
      <btn icon="add_circle" @click="openAddModal"> Add Expense </btn>
    </div>
  </div>
</template>

<script>
import { query, collection, onSnapshot } from "firebase/firestore";
import AddExpenseForm from "@/components/AddExpenseForm.vue";
import ExpenseList from "@/components/ExpenseList.vue";
import EditExpenseModal from "@/components/EditExpenseModal.vue";
import AddExpenseModal from "@/components/AddExpenseModal.vue";

export default {
  components: {
    AddExpenseForm,
    ExpenseList,
    EditExpenseModal,
    AddExpenseModal,
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
      showAddModal: false,
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

    openAddModal() {
      this.showAddModal = true;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/scss/variables";

#headers {
  @media ($mobile) {
    max-width: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  max-width: 1320px;

  h1 {
    @media ($mobile) {
      display: none;
    }
    display: flex;
    align-items: center;
    font-size: 42px;
    width: 100%;
    margin: 40px 0 20px 0;
  }

  #total-amount {
    @media ($mobile) {
      display: grid;
      justify-content: center;
      align-items: center;
    }

    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 40px 0 20px 0;
    width: 100%;

    h4 {
      @media ($mobile) {
        align-items: center;
        justify-content: center;
        margin: 0;
      }

      display: flex;
      margin: 14px 0 0 0;
    }

    span {
      @media ($mobile) {
        font-size: 24px;
      }
      font-size: 42px;
      font-family: "Space Mono";
      margin-left: 5px;
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
  @media ($mobile) {
    display: flex;
    place-content: center;
    gap: 4px;
    padding-bottom: 100px;
  }

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

#add-mobile {
  @media ($desktop) {
    display: none;
  }
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
}

#card-container {
  margin: 0 20px;
}

#site {
  @media ($mobile) {
    width: 100%;
    display: block;
  }

  background-color: #f0fded;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-expense-form {
  @media ($mobile) {
    display: none;
  }
}
</style>


