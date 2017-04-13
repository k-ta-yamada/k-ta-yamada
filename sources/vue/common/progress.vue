<template lang='pug'>
#progress

  //- http://qiita.com/Hiroshi_Obata/items/94c7d7aa3dff6f84b337
  hr
  button(class="btn btn-default" @click="start" type="submit") start
  //- button(class="btn btn-default" @click="reset" type="submit") reset
  hr
  transition-group(name='fade')
    div(v-show='isShow' key='gem.name')
      div.container(id="simple")
        //- div.progress.progress-striped.active
        //- div.progress.progress-striped
        div.progress
          div.progress-bar.progress-bar-danger(:style="progressWidth")
            span {{ progress }}%
</template>

<script>
import Vue from 'vue';

export default {
  data() {
    return {
      progress: 0,
      isShow: false,
    }
  },
  computed: {
    progressWidth: function(){
      return "width:" + this.progress + "%";
    }
  },
  methods: {
    start: function() {
      this.isShow = true
      this.progress = 0

      // // https://github.com/mzabriskie/axios#request-config
      // // onUploadProgress
      // // onDownloadProgress
      // setTimeout(() => this.progress = 100, 500 )
      // _.range(10).forEach(i => {
      //   setTimeout(() => this.progress = this.progress + 10, 100 * (i + 1) )
      // });
      // setTimeout(() => this.reset(), 1000 )

      setTimeout(() => {
        this.progress = 100
        setTimeout(() => this.isShow = false, 1000)
      }, 1000 )
      // setTimeout(() => this.reset(), 1000 )
    },
    reset: function() {
      this.isShow = false
      setTimeout(() => this.progress = 0, 500)
    },
  },
}
</script>

<style>
.container {
  /*height: 10px;*/
  /*line-height: 10px;*/
}
.progress {
  /*height: 10px;*/
  /*line-height: 10px;*/
}
.progress-bar {
  /*height: 10px;*/
  /*line-height: 10px;*/
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
