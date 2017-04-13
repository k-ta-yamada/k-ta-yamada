<template lang="pug">
#my-app
  h3 RubyGems
  ul
  .row(v-for='gem in this.gemList')
    //- header info.
    .col-md-12.col-xs-12
      hr
      h3 {{gem.name}}
      p.lead {{gem.info}}
    //- gem info.
    my-gem-info(:gem='gem')
    //- chart
    my-chart(:gem='gem')
</template>

<script>
import { mapState } from 'vuex';
import mixin from '../common/toasted.vue';
import MyGemInfo from './gemInfo.vue'
import MyChart from './chart.vue'

export default {
  name: 'my-rubygems',
  components: {
    MyGemInfo,
    MyChart,
  },
  data() {
    return {
    };
  },
  computed: mapState({
    gemList: state => state.gemList,
    baseUrl: () => window.location.pathname,
  }),
  created() {
    this.getGemList();
  },
  mixins: [mixin],
  methods: {
    getGemList() {
      let successCallback = (response) => {
        this.$store.commit('setGemList', response.data);
      };
      let url = `${this.baseUrl}.json`;
      return axios.get(url)
        .then(response => successCallback(response))
        .catch(error => this.errorCallback(error, 'getGemList'));
    },
  },
}
</script>
