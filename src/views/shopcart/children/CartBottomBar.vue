<template>
  <div class="bottom-bar">
    <div class="check">
      <check-botton class="check-botton" :is-checked="isSelectAll" @click.native="allClick"></check-botton>
      <span>全选</span>
    </div>
    <div class="total">
      合计：￥{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去结算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckBotton from "@/components/content/checkBotton/CheckBotton";
  export default {
    name: "CartBottomBar",
    components: {
      CheckBotton
    },
    computed: {
      totalPrice() {
        return this.$store.getters.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if (this.$store.state.cartList.length === 0) return false
        return !this.$store.state.cartList.find(item => !item.checked)
      }
    },
    methods: {
      allClick() {
        const a = this.isSelectAll
        this.$store.state.cartList.forEach(item => item.checked = !a)
      },
      calcClick() {
        if (!this.checkLength) {
          this.$toast.showMessage('请选择要购买的商品')
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    position: absolute;
    bottom: 49px;
    display: flex;
    background-color: #eee;
    width: 100%;
    justify-content: space-between;
  }

  .check {
    margin-top: 5px;
    display: flex;
    align-items: center;
  }

  .check-botton {
    width: 16px;
    height: 16px;
    line-height: 16px;
  }

  .check span {
    margin-left: 5px;
  }

  .total {
    margin-top: 13px;
    margin-left: 30px;
  }

  .calculate {
    padding-top: 13px;
    width: 100px;
    text-align: center;
    background-color: red;
    color: #fff;
  }
</style>
