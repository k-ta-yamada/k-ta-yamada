<template lang="pug">
#my-menu.lead
  ul
    li(v-for='m in menu')
      a(:href='m.link') {{m.title}}
</template>

<script>
import menu from '../common/menu.vue';

export default {
  name: 'my-menu',
  data() {
      return {
      menu: menu,
    };
  },
  created() {
  },
  }
</script>
