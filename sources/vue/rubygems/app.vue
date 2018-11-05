<template lang="pug">
#my-app
  vue-progress-bar
  h3 RubyGems
  p.lead My RubyGems info.

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
import { mapState } from 'vuex'
import httpWithProgress from '../common/httpWithProgress.vue'
import toasted from '../common/toasted.vue'
import MyGemInfo from './gemInfo.vue'
import MyChart from './chart.vue'

export default {
  name: 'my-rubygems',
  components: {
    MyGemInfo,
    MyChart,
  },
  data () {
    return {
    }
  },
  computed: mapState({
    gemList: state => state.gemList,
    baseUrl: () => window.location.pathname,
  }),
  created () {
    this.getGemList()
  },
  mixins: [httpWithProgress, toasted],
  methods: {
    getGemList() {

      let successCallback = (response) => {
        this.$store.commit('setGemList', response.data)
      }

      let url = `${this.baseUrl}.json`
      this.httpGet(url)
        .then(response => successCallback(response))
        .catch(error => this.errorCallback(error, 'getGemList'))
    },
  },
}
</script>
