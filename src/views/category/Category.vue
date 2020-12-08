<template>
  <div class="wrapper" ref="wrapper">
    <nav-bar class="categery-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import BScroll from 'better-scroll'

  import {getCategoryData} from "network/category";

  export default {
    name: "Category",
    components: {
      NavBar
    },
    data() {
      return {
        //  保存数据的列表
        categoryDataList: [],
      }
    },
    created() {
      getCategoryData().then(res => {
        this.categoryDataList = res.data.category.list;
      })

    },
    mounted() {
      const scroll = new BScroll(this.$refs.wrapper, {
        probeType: 3,
        click: true,
        pullUpLoad: true
      })
      // console.log(this.scroll);

      // this.scroll.on('scroll', (position) => {
      //   console.log(position);
      // })

      scroll.on('pullingUp', () => {
        console.log('s上拉加载更多');
        setTimeout(() => {
          scroll.finishPullUp()
        }, 2000)
      })

    }
  }
</script>

<style scoped>

  .categery-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

</style>
