<template lang='pug'>
#my-img-upload
  //- form
  my-form
  //- list
  my-list

  hr
  .row
    .col-md-12.col-xs-12
      a.btn.btn-danger.bnt-block(:href='`${this.baseUrl}/drop`') drop all
</template>

<script>
import { mapState } from 'vuex';
import mixin from '../common/toasted.vue';
import MyForm from './form.vue';
import MyList from './list.vue';
import MyImg from './img.vue';

export default {
  name: 'my-app',
  components: {
    MyForm,
    MyList,
    MyImg,
  },
  data() {
    return {
    };
  },
  watch: {
    initFlg() { this.getList() },
  },
  created() {
    this.$store.commit('toggleInitFlg');
  },
  mixins: [mixin],
  computed: mapState({
    file_data_chunk_size: state => state.file_data_chunk_size,
    initFlg: state => state.initFlg,
    baseUrl: () => window.location.pathname,
  }),
  methods: {
    getList() {
      this.$store.commit('clearToasts');
      let successCallback = (response) => {
        this.$store.commit('setFiles', _.chunk(response.data, this.file_data_chunk_size));
      };
      let url = `${this.baseUrl}/list`;
      axios.get(url, { timeout: 5000 })
        .then(response => successCallback(response))
        .catch(error => this.errorCallback(error, 'getList'));
    },
  },
}
</script>
