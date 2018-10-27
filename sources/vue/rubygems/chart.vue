<template lang="pug">
.col-md-8.col-xs-12
    button.btn.btn-default.btn-xs(@click='isShow = !isShow') {{isShow ? 'hide chart' : 'show chart'}}

    transition-group(name='fade')
      div(v-show='isShow' key='gem.name')
        ul.list-inline
          li(v-for='type in chartTypes')
            button.btn.btn-link.btn-xs(@click="transformChart(gem.name, type)")
              | to {{type}}
        div(:id='`chart-${gem.name}`')
        small: p.text-right
          a(href="http://c3js.org/" target="_blank" rel="noopener")
            | C3.js | D3-based reusable chart library&nbsp;
            span.glyphicon.glyphicon-link(aria-hidden="true")
</template>

<script>
import { mapState } from 'vuex'
import httpWithProgress from '../common/httpWithProgress.vue'
import toasted from '../common/toasted.vue'
import 'c3-css'

export default {
  name: 'my-chart',
  props: ['gem'],
  data () {
    return {
      chartTypes:  ['line', 'spline', 'bar', 'area'],
      isShow: false,
    }
  },
  created () {
    this.generateChart(this.gem.name)
  },
  computed: mapState({
    chart: state => state.chart,
  }),
  mixins: [httpWithProgress, toasted],
  methods: {
    errorCallback(error, message) {
      this.$toasted.error(`[${message}]<br/>${error}`, { theme: 'bubble',  duration: null })
      console.group(`errorCallback`)
      console.error(error)
      console.error(`message: [${message}]`)
      console.groupEnd()
    },
    generateChart(name) {
      let successCallback = (response) => {
        let c3Object = c3.generate({
          bindto: `#chart-${name}`,
          data: {
            json: response.data,
            keys: { value: ['number', 'downloads_count'] },
            x: 'number',
            labels: true,
            names: { downloads_count: 'downloads/version' }
          },
          axis: { x: { type: 'category' } },
          grid: { y: { show: true } },
          line: { connectNull: true },
          area: { zerobased: false },
          bar:  { zerobased: false, width: { ratio: 0.4 } },
        })
        this.$store.commit('setChart', { name: name, c3Object: c3Object })
        this.isShow = true
      }

      let url = `/rubygems/${name}`
      this.httpGet(url)
        .then((response) => successCallback(response))
        .catch(error => this.errorCallback(error, `generateChart(${name})`))
    },
    transformChart(name, type) {
      let chart = this.chart[name]
      chart.transform(type)
      chart.load({ labels: false })
    },
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
