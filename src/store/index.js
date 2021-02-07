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
    saveLocal(state) {
      localStorage.setItem('state',  JSON.stringify(state))
    },
    loadLocal(state) {
      let data =  JSON.parse(localStorage.getItem('state'))
      state.operations = data.operations
      state.my_money = data.my_money
    },
    ADD_DATA(state, data) {
      let val = data.Valute;
      for (var prop in val) {
        state.rates.push(val[prop]);
      }
    },
    SET_CURRENCY(state, data) {
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
      state.my_money.Value = state.my_money.Value + data.amount;
      state.operations[data.CharCode].amount -= data.amount;
      console.log(state.operations[data.CharCode].amount)
      if(state.operations[data.CharCode].amount <= 0) {
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
    loadLocal({ commit }){
      commit('loadLocal')
    },
    set_goal_currency({ commit }, data) {
      commit("SET_CURRENCY", data);
    },
    buy({ commit }, data) {
      commit("BUY", data);
      commit('saveLocal', data)
    },
    sell({ commit }, data) {
      commit("SELL", data);
      commit('saveLocal', data)
    },
  },
  modules: {},
});
