<template lang="pug">
#my-app
  my-message
  my-menu

  my-progress
</template>

<script>
import MyMessage from './message.vue'
import MyMenu from './menu.vue'
import MyProgress from '../common/progress.vue'

export default {
  name: 'my-app',
  data() {
    return {
    };
  },
  components: {
    MyMessage,
    MyMenu,
    MyProgress,
  },
  created() {
  },
}
</script>

<style>
</style>
