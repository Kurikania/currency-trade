<template>
  <div class="buy">
    <div class="label">Валюта</div>
    <CurrencyPicker :is_selling='is_selling' />    
    <div class="label">Доступно</div>
    <div class="bold">
      {{is_avalibale}} 
    </div>
    <div class="label">Хочу:</div>
    <div class="horizontal">
      <button :class="{ selected: !is_selling }" @click="is_selling = false">Купить</button>
      <button :class="{ selected: is_selling }" @click="is_selling = true">Продать</button>
    </div>
    <input type="number" min="0" oninput="validity.valid||(value='')" id="" placeholder="0,00" v-model="money" />
    <div class="label" v-if="!is_selling">Заплачу</div>
    <div class="label" v-else>Получу</div>
    <div class="bold">{{ exchange.toFixed(2) }} &#8381;</div>
    <button class="block-btn" v-if="!is_selling"  @click="buy">Купить</button>
    <button class="block-btn" v-else @click="sell">Продать</button>
  </div>
</template>

<script>
import CurrencyPicker from "./CurrencyPicker";
export default {
  components: {
    CurrencyPicker,
  },
  props: {},
  data() {
    return {
      money: 0.0,
      is_selling: false,
    };
  },
  computed: {
    currency() {
      return this.$store.state.rates;
    },
    goal_currency() {
      return this.$store.state.goal_currency;
    },
    exchange() {
      if (this.goal_currency) {
        return this.money / this.goal_currency.Nominal * this.goal_currency.Value;
      } else {
         return 0.00
      }
    },
    is_avalibale() {
      if (this.goal_currency) {
      return (this.mymoney.Value / (1 /this.goal_currency.Nominal * this.goal_currency.Value)).toFixed(2) + " " + this.goal_currency.CharCode;
      } else {
         return 0
      }
    },
    mymoney() {
      return this.$store.state.my_money
    },
    operations() {
      return this.$store.state.operations;
    },
  },
  methods: {
    buy() {
      if(this.mymoney.Value >= this.exchange) {       
        this.$store.dispatch("buy", {...this.goal_currency, amount: this.exchange});
        this.money = 0
      }
    },
    sell() {
      console.log(this.operations[this.goal_currency.CharCode].amount <= this.exchange)
      if(this.operations[this.goal_currency.CharCode].amount <= this.exchange) {
        this.$store.dispatch("sell",  {...this.goal_currency, amount: this.exchange} );
        this.money = 0
      }
    }
  }
};
</script>

<style scoped>
.label {
  font-size: 13px;
  color: rgba(51, 51, 51, 0.5);
}

.buy {
  background: #f6f6f6;
  width: 256px;
  height: 420px;
  display: flex;
  flex-direction: column;
  padding: 32px 16px;
  justify-content: space-between;
}

button {
  font-size: 13px;
  border: none;
  line-height: 16px;
  padding: 8px;
  height: 40px;
  background-color: white;
  border-color: #D8D8D8;
  margin: 1px
}
.horizontal {
  display: flex;
  align-content: stretch;  
}
.horizontal > button {
  flex-grow: 1;
}
.selected {
  color: #34AAF2;
}
.block-btn {  
  background-color: #00B956;
  justify-self: stretch;
  color: white
}

input {
  height: 40px;
  width: 240px;
  padding: 0 0 0 16px !important;
  margin-bottom: 10px;
}
</style>
