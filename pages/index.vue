<template>
  <div class="container">
    <div class="main">
      <div class="info">
        <p>在这里实现你的梦想</p>
        <p>很容易！</p>
        <div class="searchBox">
          <div class="local">
            <LocationFilled class="localIcon"/>
            <div class="btn">杭州</div>
          </div>
          <el-input class="search" size="large">
            <template #prepend>
              <Search class="searchIcon"/>
            </template>
            <template #append>
              <div class="searchBtn btn">
                搜索你想要的位置
              </div>
            </template>
          </el-input>
        </div>
      </div>
      <img src="@/assets/img/house.jpeg" alt="">
    </div>
    <div class="">
      <p>品质好房</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from "vue"
import { LocationFilled, Search } from '@element-plus/icons-vue'


</script>

<style lang="scss" scoped>
.container {
  padding-left: $headerLeft;
  background: linear-gradient(135deg,$btnActive 0,#ffffff 25%);
  .main {
    .info {
      position: relative;
      width: 500px;
      padding: 180px 50px 50px 0;
      border-radius: 20px;
      z-index: 2;
      .searchBox {
        margin-top: 80px;
        .local {
          display: flex;
          align-items: center;
          margin-bottom: 25px;
          .localIcon {
            width: 36px;
            color: $orange;
          }
          .btn {
            margin-left: 10px;
            text-align: left;
          }
        }
        .searchIcon {
          width: 22px;
          margin: 0 -3px 0 10px;
        }
        .searchBtn {
          width: 160px;
          height: 45px;
          line-height: 45px;
          margin: 0;
          font-size: 14px;
          background-color: $primary;
          color: #ffffff;
        }
      }
    }
    img {
      position: absolute;
      top: 0;
      right: 0;
      width: 800px;
      height: 560px;
      border-radius: 0 0 0 60px;
    }
  }
}
</style>