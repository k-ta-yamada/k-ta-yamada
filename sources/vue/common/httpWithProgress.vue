<script>
import axios from 'axios'
import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
  color: '#4fc08d',
  failedColor: '#f66',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s'
  },
  autoRevert: true,
  inverse: false
})

export default {
  methods: {
    httpGet(url) {
      let promise = new Promise((resolve, reject) => {
        let successCallback = (response) => {
          this.$Progress.finish()
          resolve(response)
        };
        let errorCallback = (response) => {
          this.$Progress.fail()
          reject(error)
        };

        this.$Progress.start()
        axios.get(url)
          .then(response => successCallback(response))
          .catch(error => errorCallback(error))
      })
      return promise
    },
    httpPost(url, formData, config) {
      let promise = new Promise((resolve, reject) => {
        let successCallback = (response) => {
          this.$Progress.finish()
          resolve(response)
        };
        let errorCallback = (response) => {
          this.$Progress.fail()
          reject(error)
        };

        this.$Progress.start()
        axios.post(url, formData, config)
          .then(response => successCallback(response))
          .catch(error => errorCallback(error))
      })
      return promise
    },
    httpDelete(url) {
      let promise = new Promise((resolve, reject) => {
        let successCallback = (response) => {
          this.$Progress.finish()
          resolve(response)
        };
        let errorCallback = (response) => {
          this.$Progress.fail()
          reject(error)
        };

        this.$Progress.start()
        axios.delete(url)
          .then(response => successCallback(response))
          .catch(error => errorCallback(error))
      })
      return promise
    },
  },
}
</script>
