<template lang="pug">
#my-messages.lead
  p(v-for='m in computedMessages') {{m}}
</template>

<script>
export default {
  name: 'my-message',
  data() {
    return {
      messages: [
        'hello',
        'here is my place',
      ],
    };
  },
  computed: {
    computedMessages() {
      let result = _.map(this.messages, (m, i) => `${m}.`);
      return result;
    }
  },
  methods: {
  },
  created() {
  },
}
</script>

<style>
</style>
