<template lang='pug'>
#my-form
  vue-progress-bar
  .row
    .col-md-12.col-xs-12
      form(name="uploadForm" enctype="multipart/form-data")
        input.form-control(
          type="text" name="message" v-model="message" placeholder="message")
        input.form-control(
          type="text" name="memo" v-model="memo" placeholder="memo")
        input.form-control(
          type="password" name="pass" v-model="pass" ng-required="true" placeholder="pass")
        input.btn.btn-default.btn-block.btn-sm(
          type="file" name="file" id="file" multiple="" @click='toastClear')
        input.btn.btn-warning.btn-block.btn-lg(
          type="button" value="upload" ng-disabled="uploadForm.$invalid" @click="upload")
        //- TODO: ng-required and ng-disabled
        //-       refs:
        //-         https://github.com/logaretm/vee-validate
        //-         https://github.com/fergaldoyle/vue-form
</template>

<script>
import { mapState } from 'vuex'
import httpWithProgress from '../common/httpWithProgress.vue'
import toasted from '../common/toasted.vue'

export default {
  name: 'my-form',
  data () {
    return {
      message: '',
      memo:    '',
      pass:    '',
      config: {
        timeout: 10000,
        headers: { 'Content-type': undefined },
        transformRequest: null,
      },
    }
  },
  computed: mapState({
    file_size_limit: state => state.file_size_limit,
    file_type: state => state.file_type,
  }),
  mixins: [httpWithProgress, toasted],
  methods: {
    upload(id) {
      this.$store.commit('clearToasts')

      let files = $('#file').prop('files')
      if (!this.isValid(files)) return

      let formData = new FormData()
      formData.append('message', this.message || '')
      formData.append('memo',    this.memo || '')
      formData.append('pass',    this.pass)
      _.forEach(files, file => formData.append('files[]', file))

      this.httpPost('img_upload', formData, this.config)
        .then(response => this.postSuccess(files))
        .catch(error => this.errorCallback(error, 'upload'))
    },
    validation(files) {
      let errMsgs = []
      if (files.length == 0) {
        errMsgs.push('attached nothing')
        return errMsgs
      }
      _.forEach(files, (file, k) => {
        let temp = []
        if (file.size > this.file_size_limit) {
          temp.push(`[size over]: ${file.size} / ${this.file_size_limit}`)
        }
        if (!file.type.match(this.file_type)) {
          temp.push(`[not allow file type]: ${file.type}`)
        }
        if (temp.length > 0) {
          errMsgs.push(`${file.name}<br/>${temp.join('<br/>')}`)
        }
      })
      return errMsgs
    },
    isValid(files) {
      let result = this.validation(files)
      _.forEach(result, msg => {
        let t = this.$toasted.error(`${msg}`, { theme: 'bubble',  duration: null })
        this.$store.commit('setToasts', t)
        console.warn(msg)
      })
      return result.length == 0
    },
    postSuccess(files) {
      _.forEach(files, file =>
        this.$toasted.success(`[${file.name}] is uploaded.`))

      this.memo    = ''
      this.message = ''
      this.pass    = ''
      // ref: http://stackoverflow.com/a/24282495/6622514
      $('#file').replaceWith($('#file').val('').clone(true))

      this.$store.commit('toggleInitFlg')

      // setTimeout(
      //   this.$store.commit('toggleInitFlg'), 3000
      // )
    },
  },
}
</script>
