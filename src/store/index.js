import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rates: [],
    my_money: { CharCode: "RUB", Value: 10000.0 },
    operations: {},
    goal_currency: null,
  },
  mutations: {
    ADD_DATA(state, data) {
      let val = data.Valute;
      for (var prop in val) {
        state.rates.push(val[prop]);
      }
    },
    SET_CURRENCY(state, data) {
      console.log(data);
      state.goal_currency = data;
    },
    BUY(state, data) {
      console.log(data.amount)
      state.my_money.Value = state.my_money.Value - data.amount;
      if (state.operations[data.CharCode] === undefined) {
        state.operations[data.CharCode] = data;
      } else {
        state.operations[data.CharCode].amount += data.amount;
      }
    },
    SELL(state, data) {
      console.log(data.amount)
      state.my_money.Value = state.my_money.Value + data.amount;
      //if (state.operations[data.CharCode] === undefined) state.operations[data.CharCode] = data.amount
      state.operations[data.CharCode].amount -= data.amount;
      if(state.operations[data.CharCode].amount === 0) {
        delete state.operations[data.CharCode]
      }
    },
  },
  actions: {
    loadData({ commit }) {
      fetch("https://www.cbr-xml-daily.ru/daily_json.js")
        .then((response) => response.json())
        .then((data) => {
          commit("ADD_DATA", data);
        });
    },
    set_goal_currency({ commit }, data) {
      console.log(data);
      commit("SET_CURRENCY", data);
    },
    buy({ commit }, data) {
      commit("BUY", data);
    },
    sell({ commit }, data) {
      commit("SELL", data);
    },
  },
  modules: {},
});
