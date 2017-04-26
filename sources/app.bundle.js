require('bootstrap-loader');
import './css/app.css';

import Vue from 'vue';
import MyNav from './vue/common/nav.vue';

$(document).ready(() => {
  new Vue({
  el: '#my-nav',
  components: {
    MyNav,
  },
  template: '<my-nav/>',
  });
});
