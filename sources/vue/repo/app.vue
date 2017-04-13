<template lang="pug">
#my-app
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
import { mapState } from 'vuex';
import mixin from '../common/toasted.vue';

export default {
  name: 'my-app',
  components: {
  },
  data() {
    return {
      selectedBranch: 'master',
    };
  },
  watch: {
    selectedBranch() { this.getCommits(); }
  },
  computed: mapState({
    branches: state => state.branches,
    commits: state => state.commits,
    baseUrl: () => window.location.pathname,
  }),
  created() {
    this.getBranches();
    this.getCommits();
  },
  mixins: [mixin],
  methods: {
    getBranches() {
      this.toastClear()
      let successCallback = (response) => {
        this.$store.commit('setBranches', response.data);
      };
      let url = `${this.baseUrl}/branches`;
      return axios.get(url)
        .then(response => successCallback(response))
        .catch(error => this.errorCallback(error, 'getBranches'));
    },
    getCommits() {
      this.toastClear()
      let successCallback = (response) => {
        this.$store.commit('setCommits', response.data);
      };
      let url = `${this.baseUrl}/commits`;
      return axios.get(`${url}/${this.selectedBranch}`)
        .then(response => successCallback(response))
        .catch(error => this.errorCallback(error, 'getCommits'));
    },
  },
}
</script>
