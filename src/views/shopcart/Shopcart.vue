<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <cart-list></cart-list>

    <cart-bottom-bar class="cart-bottom-bar"></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import CartList from "@/views/shopcart/children/CartList";
  import CartBottomBar from "@/views/shopcart/children/CartBottomBar";

  import {mapGetters} from 'vuex'

  export default {
    name: "Shopcart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters({
        length: 'cartLength'
      })
    },
  }
</script>

<style scoped>
  body {
    height: 100%;
  }
  .nav-bar {
    background: var(--color-tint);
    color: #fff;
  }

  /*.cart-bottom-bar {*/
  /*  position: relative;*/
  /*  bottom: 49px;*/
  /*}*/
</style>
