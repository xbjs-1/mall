<template>
  <div class="user-info">
    <a href="" class="login">
      <div class="item user-image">
        <img src="~assets/img/profile/avatar.svg" alt="">
      </div>
      <div class="user-login">
        <div>
          <span>登录/注册</span>
          <div class="user-phone">
            <img src="~assets/img/profile/phone.svg" alt="">
            <div class="phone-text">暂未绑定手机号</div>
          </div>
        </div>
      </div>
      <div class="item arrow">
        <img src="~assets/img/common/arrow-left.svg" alt="">
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    name: "UserInfo",
    methods: {

    }
  }
</script>

<style scoped>
  .user-info {
    background-color: var(--color-tint);
    padding: 35px 15px 15px 15px;
  }

  .login {
    display: flex;
    justify-content: space-between;
  }

  .login img {
    width: 20px;
  }

  .user-image {
    width: 60px;
    margin-right: 5px;
    flex: 1;
  }

  .user-image img{
    width: 60px;
  }

  .user-login {
    flex: 3;
    color: #fff;
    margin-top: 10px;

  }

  .user-login .user-phone{
    display: flex;
    text-align: center;
    margin-top: 10px;
  }

  .user-login span {
    font-weight: 600;
  }

  .user-phone .phone-text{
    font-size: 14px;
    margin-top: 2px;
  }

  .arrow {
    flex: 1;
    align-self: center;
    text-align: right;
  }

</style>
