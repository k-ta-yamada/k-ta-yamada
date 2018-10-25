import Vue from 'vue';
import store from './vue/rubygems/_mutex.vue';
import MyApp from './vue/rubygems/app.vue'

const vm = new Vue({
  el: '#vue-app',
  store,
  components: {
    MyApp,
  },
  template: '<my-app/>',
});
