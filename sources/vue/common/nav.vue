<template lang='pug'>
nav.navbar.navbar-default.navbar-fixed-top
  .navbar-header
    button(type="button" class="navbar-toggle" data-toggle="collapse" data-target="#nav-menu-1")
      span(class="sr-only") Toggle navigation
      span(class="icon-bar")
      span(class="icon-bar")
      span(class="icon-bar")
    a.navbar-brand(href="/")
      span.glyphicon.glyphicon-home(aria-hidden="true")

  #nav-menu-1.collapse.navbar-collapse
    ul.nav.navbar-nav.lead
      li(v-for='m in menu')
        a(:href='m.link') {{m.title}}
      //- li: a href="/prof" prof
      //- li: a href="/rubygems" rubygems
      //- li: a href="/repo/commits" commit log
      //- li: a href="/sample/img_upload" upload
</template>

<script>
import menu from './menu.vue';

export default {
  // name: 'my-nav',
  data() {
    return {
      menu: menu,
    }
  },
}
</script>
