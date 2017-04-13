<script>
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    toasts: [],
    branches: [],
    commits: [],
  },
  mutations: {
    setToasts(state, payload) {
      state.toasts.push(payload);
    },
    clearToasts(state) {
      _.forEach(state.toasts, t => t.goAway(0));
      state.toasts = [];
    },
    setBranches(state, payload) {
      state.branches = payload;
    },
    setCommits(state, payload) {
      state.commits = payload;
    },
  },
  getters: {
  },
})
</script>
