<template>
  <div class="check-botton"
       :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckBotton",
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    },

  }
</script>

<style scoped>
  img {
    width: 12px;
    height: 12px;
  }
  .check-botton {
    border-radius: 50%;
    border: 2px solid #aaa;
  }

  .check {
    border-color: var(--color-tint);
    background-color: var(--color-tint);
  }
</style>
