<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content"
            :probe-type="3"
            :pull-up-load="true">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <detail-shop-info :shop-info="shopInfo"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
      <detail-params-info :item-params="itemParams"></detail-params-info>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <goods-list :goods="recommends"></goods-list>
    </scroll>

  </div>
</template>

<script>
  import DetailNavBar from "@/views/detail/DetailNavBar";
  import DetailSwiper from "@/views/home/chlidren/DetailSwiper";
  import DetailBaseInfo from "@/views/home/chlidren/DetailBaseInfo";
  import DetailShopInfo from "@/views/home/chlidren/DetailShopInfo";
  import DetailGoodsInfo from "@/views/home/chlidren/DetailGoodsInfo";
  import DetailParamsInfo from "@/views/home/chlidren/DetailParamsInfo";
  import DetailCommentInfo from "@/views/home/chlidren/DetailCommentInfo";

  import Scroll from "@/components/common/scroll/Scroll";
  import GoodsList from "@/components/content/goods/GoodsList";

  import {getDetail, Goods, getRecommend} from "@/network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goodsInfo: {},
        shopInfo: {},
        detailInfo: {},
        itemParams: {},
        commentInfo: {},
        recommends: [],
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
        this.goodsInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //  获取商铺信息
        this.shopInfo = data.shopInfo

        //  取出详情信息
        this.detailInfo = data.detailInfo

        //  取出参数信息
        this.itemParams = data.itemParams

        //  取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      getRecommend().then(res => {
        this.recommends = res.data.list
      })



    }

  }
</script>

<style scoped>
  .detail {
    height: 100vh;
    background-color: white;
    position: relative;
    z-index: 1;
  }

  .content {
    /*height: calc(100% - 44px);*/
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
