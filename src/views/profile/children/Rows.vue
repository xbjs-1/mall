<template>
  <div class="rows">
    <div class="remain">
      <div class="num"><span>0.00</span>元</div>
      <div class="text">我的余额</div>
    </div>
    <div class="discount">
      <div class="num"><span>0</span>个</div>
      <div class="text">我的优惠</div>
    </div>
    <div class="accumulate">
      <div class="num"><span>0</span>分</div>
      <div class="text">我的积分</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rows"
}
</script>

<style scoped>
  .rows {
    display: flex;
    text-align: center;
    height: 84px;
    align-items: center;
  }

  .rows span {
    color: #ff5f3e;
    font-weight: bold;
    font-size: 24px;
  }

  .remain {
    flex: 1;
  }

  .discount {
    flex: 1;
  }

  .accumulate {
    flex: 1;
  }

  .num {
    padding-bottom: 5px;
  }

  .text {
    font-size: 14px;
  }

</style>
