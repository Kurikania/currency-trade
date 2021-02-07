<template>
  <div>
    <select v-model="picker_currency" @change="set_goal_currency">
      <template v-if="!is_selling">
        <option v-for="cur in currency" :key="cur.ID" :value="cur">
          {{ cur.Name }} ({{ cur.CharCode }})
        </option>
      </template>
      <template v-else>
        <option v-for="(cur, name) in operations" :key="cur.ID" :value="cur">
          {{ cur.Name }} ({{ name }})
        </option>
      </template>
    </select>
  </div>
</template>

<script>
export default {
  props: ["is_selling"],

  data() {
    return {
      picker_currency: null,
    };
  },
  methods: {
    set_goal_currency() {
      this.$store.dispatch("set_goal_currency", this.picker_currency);
    },
  },
  computed: {
    currency() {
      return this.$store.state.rates;
    },
    operations() {
      return this.$store.state.operations;
    },
    goal_currency() {
      return this.$store.state.goal_currency;
    },
  },
};
</script>

<style scoped>
select {
  font-family: "PT Sans", sans-serif; 
  max-width: 256px;
  height: 40px;
  font-weight: 700;
}
option:checked {
  font-weight: 700;
}
</style>