<template>
  <div id="app">
    <div class="main">
      <Buy :goal_currency="goal_currency" />
      <ExchangeRate />
      <div class="balance">
        <div class = "bold header">Баланс</div>
        <div class="separated"> <div>{{ my_money.CharCode }}</div> <div>{{ my_money.Value.toFixed(2) }}</div></div>
        <div v-for="(val, name) in operations" :key="name" class="separated">
          <div>{{ name }}</div>
          <div>{{ val.amount.toFixed(4) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Buy from "./components/Buy.vue";
import ExchangeRate from "./components/ExchangeRate.vue";
export default {
  name: "App",
  components: {
    Buy,
    ExchangeRate,
  },
  data() {
    return {
      balance: false,
    };
  },
  computed: {
    currency() {
      return this.$store.state.rates;
    },
    operations() {
      return this.$store.state.operations;
    },
    my_money() {
      return this.$store.state.my_money;
    },
    goal_currency() {
      return this.$store.state.goal_currency;
    },
  },
  mounted() {
    this.$store.dispatch("loadData");    
    this.$store.dispatch("loadLocal");    
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap");
#app {
  display: flex;
  font-family: "PT Sans", sans-serif;  
  box-sizing: border-box;
  font-size: 16px;
}
.header {
  margin-bottom: 16px
}
.main {
  display: flex;
  margin: 32px auto
}
.balance {
  width: 200px;
  background-color: #F6F6F6;
  padding: 32px 16px;
  height: fit-content;
}
.separated {
  width: inherit;
  display: flex; 
  justify-content: space-between;
  line-height: 16px;
  margin-bottom: 10px;
}

.bold{
  font-weight: 700;
  line-height: 24px; 
}


</style>


