<template>
  <div class="list-view">
    <div class="wrapper">
      <div :list="listData"
           v-for="(item, index) in listData"
           :key="index"
           class="list-data">
        <div class="icon">
          <img :src="item.icon" alt="">
        </div>
        <div class="icon-text">{{item.info}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ListView",
    props: {
      listData: {
        type: Array,
        default() {
          return [];
        }
      }
    },
  }
</script>

<style scoped>

  .wrapper::before {
    height: 10px;
    display: block;
    content: "";
    background-color: #e6e6e6;
  }
  .list-data {
    display: flex;
    height: 44px;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 1);
    border-color: #e6e6e6;
    padding-left: 15px;
  }

  .wrapper .icon img {
    width: 18px;
  }

  .wrapper .icon-text {
    padding-left: 5px;
  }
</style>
