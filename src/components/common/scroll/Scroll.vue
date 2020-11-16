<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      //  1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        pullUpLoad: true,
        probeType: this.probeType,
        click: true
      })

      //  2.监听滚动的位置
      this.scroll.on('scroll', (position) => {
        // console.log('hello');
        this.$emit('scroll', position)
      })

      //  3.监听上拉事件
      this.scroll.on('pullingUp', () => {
        // console.log('hello');
        this.$emit('pullingUp')
      })

    },
    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.finishPullUp()
      }
    }
  }
</script>

<style scoped>

</style>
