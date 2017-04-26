import Vue from 'vue';
import Vuex from 'vuex'
import store from './vue/repo/_mutex.vue';
import MyApp from './vue/repo/app.vue'

const vm = new Vue({
  el: '#vue-app',
  store,
  components: {
    MyApp,
  },
  template: '<my-app/>',
});
