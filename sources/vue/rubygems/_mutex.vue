<script>
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    toasts: [],
    gemList: [],
    chart: {},
  },
  mutations: {
    setGemList(state, payload) {
      state.gemList = payload;
    },
    setChart(state, payload) {
      let { name, c3Object } = payload;
      state.chart[name] = c3Object;
    },
  },
  getters: {
  },
})
</script>
