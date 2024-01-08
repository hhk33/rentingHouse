<template>
  <div class="show-box">
    <div v-if="path === '/'">
      <span class="subheading">猜你喜欢</span>
      <p class="heading">其他推荐</p>
    </div>
    <div class="btn-list" @click="refresh">
      <div class="btn active">
        <el-icon><Refresh /></el-icon>
         换一批
      </div>
    </div>
    <div class="rec-list flex">
      <div class="rec-item" v-for="item in 8" :key="item">
        <img src="@/assets/img/recommand.png" alt="">
        <h4 class="title">整租·万马伊顿庄园 3室2厅</h4>
        <div class="flex">
          <p class="area">临安 / 3室2厅2卫</p>
          <p class="price">3000 元/月</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const router = useRouter()
const path = router.currentRoute.value.path

const refresh = () => {}

onMounted(() => {
  refresh()
})
</script>

<style lang="scss" scoped>
.btn {
 width: 100px;
}
.rec-list {
  flex-wrap: wrap;
  .rec-item {
    width: 240px;
    margin: 40px 0 0 60px;
    img {
      width: 100%;
      height: 180px;
      border-radius: 10px;
    }
    .title {
      margin: 10px 0;
      font-size: 18px;
    }
    .flex {
      justify-content: space-between;
      .area {
        font-size: 14px;
        color: $gray;
      }
      .price {
        float: right;
        font-size: 16px;
        color: red;
      }
    }
  }
}
</style>