<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>

<script>
  import DetailNavBar from "@/views/detail/DetailNavBar";
  import DetailSwiper from "@/views/home/chlidren/DetailSwiper";
  import {getDetail, Goods} from "@/network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: null
      }
    },
    created() {
      //  保存传入的iid
      this.iid = this.$route.params.iid

      //   根据iid请求数据
      getDetail(this.iid).then(res => {
        const data = res.result
        //  获取顶部轮播数据
        this.topImages = data.itemInfo.topImages
        
        //  获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      })

    }

  }
</script>

<style scoped>

</style>
