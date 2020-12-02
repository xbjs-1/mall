<template>
  <div v-show="show" class="toast">{{message}}</div>
</template>

<script>
  export default {
    name: "Toast",
    // props: {
    //   message: {
    //     type: String,
    //     default: ''
    //   },
    //   show: {
    //     type: Boolean,
    //     default: false
    //   }
    // },
    data() {
      return {
        message: '',
        show: false
      }
    },
    methods: {
      showMessage(message, duration=1000) {
        this.show = true
        this.message = message

        setTimeout(() => {
          this.show = false
          this.message = ''
        }, duration)
      },
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: rgba(0, 0, 0, .75);
    color: #fff;
    padding: 8px 10px;
    z-index: 999;
    transform: translate(-50%, -50%);
  }
</style>
