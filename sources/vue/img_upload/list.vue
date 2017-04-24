<template lang='pug'>
#my-list
  .row(v-for='(chunk, rownum) in this.files')
    hr
    div(:class='bootstrapColClass()' v-for='file in chunk')
      my-img(v-bind:file='file' v-bind:key='file.id')
</template>

<script>
import { mapState } from 'vuex'
import MyImg from './img.vue'

export default {
  name: 'my-list',
  props: ['file_data_chunk_size'],
  components: {
    MyImg,
  },
  data () {
    return {
    }
  },
  computed: mapState({
    file_data_chunk_size: state => state.file_data_chunk_size,
    files: state => state.files,
  }),
  methods: {
    bootstrapColClass() {
      let size = parseInt(12 / this.file_data_chunk_size)
      return `col-md-${size} col-xs-${size}`
    },
  },
}
</script>
