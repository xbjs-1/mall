<template>
  <div class="detail">
    <detail-nav-bar @titleClick="titleClick" ref="navBar"></detail-nav-bar>
    <scroll class="content"
            :probe-type="3"
            :pull-up-load="true"
            ref="scroll"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <detail-shop-info :shop-info="shopInfo"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>
      <detail-params-info
        :item-params="itemParams" ref="params"></detail-params-info>
      <detail-comment-info
        :comment-info="commentInfo"
        ref="comment"></detail-comment-info>
      <goods-list
        :goods="recommends"
        ref="recommend"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>

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
  import DetailBottomBar from "@/views/detail/DetailButtomBar";

  import Scroll from "@/components/common/scroll/Scroll";
  import GoodsList from "@/components/content/goods/GoodsList";
  // import Toast from "@/components/common/toast/Toast";

  import {getDetail, Goods, getRecommend} from "@/network/detail";
  import {itemListenerMixin, backTopMixin} from "@/common/utils/mixin";
  import {debounce} from "@/common/utils/utils";
  import {mapActions} from 'vuex'

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
      DetailBottomBar,
      Scroll,
      GoodsList,
    },
    mixins: [itemListenerMixin, backTopMixin],
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
        themeTops: [],
        getThemeTop: null,
        currentIndex: 0,
        message: '',
        show: false
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

        //  给top赋值
        this.getThemeTop = debounce(() => {
          this.themeTops = []
          this.themeTops.push(0)
          this.themeTops.push(this.$refs.params.$el.offsetTop)
          this.themeTops.push(this.$refs.comment.$el.offsetTop)
          this.themeTops.push(this.$refs.recommend.$el.offsetTop)
        }, 100)

        //  取出参数信息
        this.itemParams = data.itemParams

        //  取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        //  获取各组件的offsetTop
        // this.$nextTick(() => {  //  根据最新的数据，dom已经渲染完了，但是图片还没渲染完
        //   this.themeTops = []
        //   this.themeTops.push(0)
        //   this.themeTops.push(this.$refs.params.$el.offsetTop)
        //   this.themeTops.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTops.push(this.$refs.recommend.$el.offsetTop)
        //   console.log(this.themeTops);
        // })

      })

      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    mounted() {

    },
    updated() {

    },
    methods: {
      ...mapActions({
        add:'addCart'
      }),
      detailImageLoad() {
        this.newRefresh()
        this.getThemeTop()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTops[index], 200)
      },
      contentScroll(position) {
        const positionY = -position.y

        for (let i = 0; i < this.themeTops.length; i++) {
          if (this.currentIndex !== i) {

            if (i === this.themeTops.length - 1 && positionY >= this.themeTops[i]
              || positionY > this.themeTops[i] && positionY < this.themeTops[i + 1]) {
              this.currentIndex = i
              this.$refs.navBar.currentIndex = i
            }
          }
        }

        //  backtop
        this.isShowBackTop = -position.y > 1000
      },
      addCart() {
        //  获取商品
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goodsInfo.title
        product.desc = this.goodsInfo.desc
        product.price = this.goodsInfo.realPrice
        product.iid = this.iid

        //  添加到购物车
        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res)
        // })
        this.add(product).then(res => {
          this.$toast.showMessage(res)
        })



      }
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
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
  }


</style>
