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
        //- TODO: validator
        input.form-control(
          type="password" name="pass" v-validate="validatePass" v-model="pass" placeholder="pass")
        //- TODO: https://github.com/k-ta-yamada/k-ta-yamada/issues/15
        input.btn.btn-default.btn-block.btn-sm(
          type="file" name="file" id="file" multiple @click='toastClear')
        input.btn.btn-warning.btn-block.btn-lg(
          type="button" value="upload" v-bind:disabled="errors.any()" @click="beforeUpload")
        ul#errors(v-show='errors.any()')
          li(v-for='e in errors.errors') {{e.field}}: {{e.msg}}
</template>

<script>
import { mapState } from 'vuex'
import httpWithProgress from '../common/httpWithProgress.vue'
import toasted from '../common/toasted.vue'

// TODO: validator
import Vue from 'vue'
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

export default {
  name: 'my-form',
  data () {
    return {
      message: '',
      memo:    '',
      pass:    '',
      validatePass: { required: true },
      // validateFile: { required: true, image: true, size: 1024 },
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
    beforeUpload() {
      this.$validator.validateAll()
        .then(() => this.upload())
        .catch(() => console.warn('invalid'))
    },
    upload() {
      this.$store.commit('clearToasts')

      if (this.errors.any()) { return; }

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

      // TODO: https://github.com/k-ta-yamada/k-ta-yamada/issues/15
      $('#file').replaceWith($('#file').val('').clone(true))

      Vue.nextTick(() => this.$validator.errorBag.clear())
      // this.$validator.errorBag.clear()

      this.$store.commit('toggleInitFlg')

    },
  },
}
</script>


<style>
#errors {
  color: red;
  margin-top: 10px;
}
</style>
