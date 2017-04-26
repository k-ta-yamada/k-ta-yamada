import Vue from 'vue';
import Vuex from 'vuex';
import store from './vue/img_upload/_mutex.vue';
import MyApp from './vue/img_upload/app.vue';

const vm = new Vue({
  el: '#vue-app',
  store,
  components: {
    MyApp,
  },
  template: '<my-app/>',
});
