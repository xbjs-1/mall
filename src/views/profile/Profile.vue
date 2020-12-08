<template>
  <div class="profile-nav-bar">
    <nav-bar class="nav-bar">
      <div slot="center">我的商城</div>
    </nav-bar>
    <user-info></user-info>
    <rows></rows>
    <list-view :list-data="orderList"></list-view>
    <list-view :list-data="serviceList"></list-view>
  </div>

</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import UserInfo from "@/views/profile/children/UserInfo";
  import Rows from "@/views/profile/children/Rows";
  import ListView from "@/views/profile/children/ListView";

  export default {
    name: "Profile",
    components: {
      NavBar,
      UserInfo,
      Rows,
      ListView
    },
    data () {
      return {
        orderList: [
          {icon: require('assets/img/profile/message.svg'), info: '我的消息'},
          {icon: require('assets/img/profile/pointer.svg'), info: '积分商城'},
          {icon: require('assets/img/profile/vip.svg'), info: '会员卡'},
        ],
        serviceList: [
          {icon: require('assets/img/profile/cart.svg'), info: '我的购物车'},
          {icon: require('assets/img/profile/shopping.svg'), info: '下载购物APP'},
        ]
      }
    },
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }


</style>
