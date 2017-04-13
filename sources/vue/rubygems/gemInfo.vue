<template lang="pug">
//- gem info.
.col-md-4.col-xs-12
  dl
    template(v-for='key in gemUriList')
      dt {{key}}
      dd
        a(:href='gem[key]' target='_blank')
          | {{gem[key]}}&nbsp;
          span.glyphicon.glyphicon-link(aria-hidden='true')
    template(v-for='key in gemInfoList')
      dt {{key}}
      dd {{gem[key]}}
  dl
    dt BestGems
    dd
      a(:href='"http://bestgems.org/gems/" + gem.name' target='_blank')
        | http://bestgems.org/gems/{{gem.name}}&nbsp;
        span.glyphicon.glyphicon-link(aria-hidden='true')
</template>

<script>
export default {
  name: 'my-gem-info',
  props: ['gem'],
  data() {
    return {
      gemUriList:  ["project_uri", "source_code_uri", "documentation_uri"],
      gemInfoList: ["version", "version_downloads", "downloads"],
    };
  },
}
</script>

<style>
</style>
