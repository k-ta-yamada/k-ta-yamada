<script>
import Vue from 'vue';
import Toasted from 'vue-toasted';

Vue.use(Toasted, {
  theme: 'outline',
  duration: 3000,
})

export default {
  methods: {
    errorCallback(error, message) {
      console.log('i am mixed')
      this.$store.commit('setToasts',
        this.$toasted.error(`[${message}]<br/>${error}`, { theme: 'bubble',  duration: null })
      );
      console.group(`errorCallback`);
      console.error(error);
      console.error(`message: [${message}]`);
      console.groupEnd();
    },
    toastClear() {
      this.$store.commit('clearToasts');
    },
  },
}
</script>
