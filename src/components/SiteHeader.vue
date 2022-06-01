<template>
  <header>
    <h1>Expense Tracker</h1>
    <div class="total-amount">
      <h4>Total:</h4>
      <span id="total" :class="{ positive: total > 0, negative: total < 0 }">{{
        formatCurrency(total)
      }}</span>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    expenseList: Array,
  },

  data() {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    return {
      formatter,
    };
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
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/variables";

header {
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

  .total-amount {
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
</style>
