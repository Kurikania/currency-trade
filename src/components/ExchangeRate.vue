<template>
  <div class="rate">
    <div class="bold header">Курс Валют на {{ today }}</div>
    <table cellspacing="0">
      <tr>
        <th>Код</th>
        <th>Единиц</th>
        <th>Курс</th>
      </tr>
      <tr v-for="cur in currency" :key="cur.ID">
        <td>{{ cur.CharCode }}</td>
        <td>{{ cur.Nominal }}</td>
        <td :class="{is_growing: (cur.Value - cur.Previous).toFixed(1) > 0 , is_decreasing:(cur.Value - cur.Previous).toFixed(1) < 0}">
          {{ cur.Value }}
          <span>
              ({{ (cur.Value - cur.Previous).toFixed(1) }})
          </span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    currency() {
      return this.$store.state.rates;
    },
    today() {
      const d = new Date();
      var dd = d.getDate();
      var mm = d.getMonth() + 1;
      var yyyy = d.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }
      return dd + "." + mm + "." + yyyy;
    },
  },
};
</script>

<style scoped>
.is_growing {
    color: #00B956;
}
.is_decreasing {
    color: red
}
.rate {
   padding: 32px 16px;   
}
th {
  font-size: 13px;
  font-weight: normal;
  color: rgba(51, 51, 51, 0.5);
  border-bottom: 1px solid rgba(51, 51, 51, 0.5);;
}
table {
  width: 320px;
  font-size: 13px;
}
td {
  text-align: center;
}
</style>