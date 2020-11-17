<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <home-feature-view></home-feature-view>
      <tab-control :titles="['流行', '新款', '精选']"
                   class="tab-control"
                   @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="showBack"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./chlidren/HomeSwiper";
import RecommendView from "@/views/home/chlidren/RecommendView";
import HomeFeatureView from "@/views/home/chlidren/HomeFeatureView";
import GoodsList from "@/components/content/goods/GoodsList";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backtop/BackTop";

import {getHomeMultidata, getHomeGoods} from "@/network/home";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    HomeFeatureView,
    GoodsList,
    NavBar,
    TabControl,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      showBack: false
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    //1、请求多个数据
    this.getHomeMultidata()

    //2、请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')


  },
  mounted() {
    this.$bus.$on('itemLoad', () => {
      this.debounce(this.$refs.scroll.refresh, 1000)
    })
  },
  methods: {
    /*
    * 事件监听的方法
    * */
    debounce(func, delay) {
      let timer = null
      return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        default:
          this.currentType = 'sell';
          break;
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position) {
      this.showBack = -position.y > 1000;
    },
    loadMore() {
      // console.log('hello world');
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.finishPullUp();
    },
    /*
    * 网络请求相关的方法
    * */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    },

  }
}
</script>

<style scoped>
  #home {
    height: 100vh;
    padding-top: 44px;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    background-color: #fff;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
