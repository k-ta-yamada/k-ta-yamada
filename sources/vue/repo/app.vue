<template lang="pug">
#my-app
  vue-progress-bar
  select(v-model='selectedBranch')
    option(v-for='b in branches' v-bind:value='b.name') {{b.name}}

  hr

  .row
    .col-md-12.col-xs-12
      dl.dl-horizontal
        template(v-for='(c, i) in commits')
          dt {{i + 1}}
          dd.lead {{c.commit.message}}
          dd {{c.commit.author.date}} / {{c.commit.author.name}}
          dd: a(v-bind="{ href: c.html_url, target: '_blank' }") {{c.sha}}
          dd: hr
</template>

<script>
import { mapState } from 'vuex'
import httpWithProgress from '../common/httpWithProgress.vue'
import toasted from '../common/toasted.vue'

export default {
  name: 'my-app',
  data () {
    return {
      selectedBranch: 'master',
    }
  },
  watch: {
    selectedBranch() { this.getCommits() }
  },
  computed: mapState({
    branches: state => state.branches,
    commits: state => state.commits,
    baseUrl: () => window.location.pathname,
  }),
  created () {
    this.getBranches()
  },
  mixins: [httpWithProgress, toasted],
  methods: {
    getBranches() {
      this.toastClear()
      let successCallback = (response) => {
        this.$store.commit('setBranches', response.data)
        this.getCommits()
      }
      let url = `${this.baseUrl}/branches`

      this.httpGet(url)
        .then(response => successCallback(response))
        .catch(error => this.errorCallback(error))
    },
    getCommits() {
      this.toastClear()
      let successCallback = (response) => {
        this.$store.commit('setCommits', response.data)
      }
      let url = `${this.baseUrl}/commits?branche=${this.selectedBranch}`

      this.httpGet(url)
        .then(response => successCallback(response))
        .catch(error => this.errorCallback(error))
    },
  },
}
</script>
