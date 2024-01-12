<template>
  <div :class="['show-box', {'details-rec': path !== '/'}]">
    <div v-if="path === '/'">
      <span class="subheading">猜你喜欢</span>
      <p class="heading">其他推荐</p>
    </div>
    <div v-if="path === '/'" class="btn-list" @click="refresh">
      <div class="btn active">
        <el-icon><Refresh /></el-icon>
         换一批
      </div>
    </div>
    <div class="rec-list flex" :style="{fontSize: props.size + 'px'}">
      <div class="rec-item" v-for="item in props.num" :key="item">
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

const props = defineProps({
  size: {
    type: Number,
    default: 20
  },
  num: {
    type: Number,
    default: 8
  }
})

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
    width: 12em;
    margin: 2em 0 0 3em;
    img {
      width: 100%;
      height: 9em;
      border-radius: 10px;
    }
    .title {
      margin: 10px 0;
      font-size: 0.9em;
    }
    .flex {
      justify-content: space-between;
      .area {
        font-size: 0.7em;
        color: $gray;
      }
      .price {
        float: right;
        font-size: 0.8em;
        color: red;
      }
    }
  }
}
.details-rec {
  margin: -30px 0 0 -50px;
}
</style>