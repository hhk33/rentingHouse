<template>
  <div class="main">
    <div class="info">
      <p class="heading">在这里实现你的梦想</p>
      <p class="heading">很容易！</p>
      <div class="search-box">
        <div class="local" @click="navigate('/local')">
          <el-icon class="local-icon" :size="36">
            <LocationFilled/>
          </el-icon>
          <div class="btn">杭州</div>
        </div>
        <el-input class="search" size="large" v-model.trim="searchVal">
          <template #prepend>
            <el-icon class="search-icon" :size="22">
              <Search/>
            </el-icon>
          </template>
          <template #append>
            <div class="search-btn btn" @click="navigate('/search', {'search': searchVal})">
              搜索你想要的位置
            </div>
          </template>
        </el-input>
      </div>
    </div>
    <img src="@/assets/img/house.jpeg" alt="">
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let searchVal = ref<string>('')

</script>

<style lang="scss" scoped>
.main {
  .info {
    position: relative;
    width: 500px;
    padding: 180px 50px 50px 0;
    border-radius: 20px;
    z-index: 2;
    .search-box {
      margin-top: 80px;
      .local {
        display: flex;
        align-items: center;
        margin-bottom: 25px;
        cursor: pointer;
        .local-icon {
          color: $orange;
        }
        .btn {
          margin-left: 10px;
          text-align: left;
          border: none;
        }
      }
      .search-icon {
        margin: 0 -3px 0 10px;
      }
      .search-btn {
        width: 160px;
        height: 45px;
        line-height: 45px;
        margin: 0;
        font-size: 14px;
        background-color: $primary;
        color: #ffffff;
        border: none;
      }
    }
  }
  img {
    position: absolute;
    top: 0;
    width: 800px;
    height: 560px;
  }
}
@media  screen and (max-width: 824px) {
  img {
    left: 0;
  }
}
@media screen and (min-width: 824px){
  img {
    right: 0;
    border-radius: 0 0 0 60px;
  }
}
</style>