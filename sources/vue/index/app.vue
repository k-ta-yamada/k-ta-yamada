<template lang="pug">
#my-app
  my-message
  my-menu
</template>

<script>
import MyMessage from './message.vue'
import MyMenu from './menu.vue'

export default {
  name: 'my-app',
  components: {
    MyMessage,
    MyMenu,
  },
}
</script>
