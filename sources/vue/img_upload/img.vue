<template lang='pug'>
#my-img
  vue-progress-bar
  a(:href='this.imgUrl')
    img.img-responsive.img-thumbnail(
      v-bind='{ src: this.imgUrl, title: this.imgTitle }')
    //- img.img-responsive.img-thumbnail(v-bind='img')
  hr
  button.btn.btn-danger.btn-block(@click='deleteImg') delete
  button.btn.btn-primary.btn-block(@click='download') download
  hr
  .word-wrap-break
    dl.dl-horizontal
      dt id
      dd {{file.id}}
      dt type
      dd {{file.type}}
      dt size
      dd {{file.size_human}}
        br
        | ({{file.size}} Byte)
    dl
      dt filename
      dd {{file.filename}}
      template(v-if='file.message')
        dt message
        dd {{file.message}}
      template(v-if='file.memo')
        dt memo
        dd {{file.memo}}
      dt created_at
      dd {{file.created_at}}
</template>

<script>
import httpWithProgress from '../common/httpWithProgress.vue'
import toasted from '../common/toasted.vue'

export default {
  name: 'my-img',
  props: ['file'],
  computed: {
    imgUrl() { return `${window.location.pathname}/${this.file.id}` },
    imgTitle() { return this.file.filename },
  },
  mixins: [httpWithProgress, toasted],
  methods: {
    deleteImg() {
      this.toastClear()

      if (!window.confirm(`id: [${this.file.id}] is delete ok?`)) return
      let successCallback = (data) => {
        this.$toasted.success(`id [${data.id}] is deleted.`)
        this.$store.commit('toggleInitFlg')
      }
      this.httpDelete(this.imgUrl)
        .then(response => successCallback(response.data))
        .catch((error) => this.errorCallback(error, 'delete'))
    },
    download() {
      window.open(this.imgUrl, '_blank')
    },
  },
}
</script>

<style>
.word-wrap-break {
  word-wrap: break-word;
}
.dl-horizontal dt {
  width: 30px;
  text-align: left;
}
.dl-horizontal dd {
  margin-left: 50px;
}
</style>
