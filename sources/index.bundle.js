import Vue from 'vue';
import MyApp from './vue/index/app.vue'

let vm = new Vue({
  el: '#vue-app',
  components: {
    MyApp,
  },
  template: '<my-app/>',
});
