<script>
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    toasts: [],
    files: [],
    initFlg: true,
    file_data_chunk_size: 3,
    file_size_limit: Math.pow(1024, 2),
    file_type: /^image\/.*/,
  },
  mutations: {
    setToasts(state, payload) {
      state.toasts.push(payload);
    },
    clearToasts(state) {
      _.forEach(state.toasts, t => t.goAway(0));
      state.toasts = [];
    },
    setFiles(state, payload) {
      state.files = payload;
    },
    toggleInitFlg(state) {
      state.initFlg = !state.initFlg;
    }
  },
  getters: {
  },
})
</script>
