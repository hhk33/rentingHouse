<template>
  <div class="header headerShadow">
    <img src="@/assets/img/logo.png" alt="">
    <div class="list">
      <div class="search">
        <el-input  :prefix-icon="Search" />
      </div>
      <div class="btn">我要租房</div>
      <div class="btn">我要出租</div>
      <div class="btn">联系我们</div>
      <div class="login">
        <div class="btn active">登录</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  width: 100%;
  height: $headerHigh;
  display: flex;
  align-items: center;
  justify-content:space-between;
  background-color: #ffffff25;
  z-index: 99;
  img {
    width: 80px;
    margin: 5px 50px 0 $headerLeft;
    cursor: pointer;
  }
  .list {
    display: flex;
    align-items: center;
    .search {
      width: 22vw;
      height: 30px;
      background-color: transparent;
    }
  }
  .login {
    width: 220px;
    margin-left: 10px;
    .btn {
      width: 75px;
      height: 40px;
      line-height: 40px;
      border: 40px;
    }
  }
}
.headerShadow {
  box-shadow: 0px 0px 5px $gray;
}
</style>