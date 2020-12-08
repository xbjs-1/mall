<template>
  <div class="list-view-item">
    {{list.icon}}{{list.message}}
  </div>
</template>

<script>
  export default {
    name: "ListViewItem",
    props: {
      list: {
        type: Object,
        default () {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .list-view-item {
    height: 44px;
    background-color: #bfa;
  }
</style>
