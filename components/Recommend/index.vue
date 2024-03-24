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
      <div
        class="rec-item"
        v-for="item in houseList"
        :key="item.houseId"
        @click="toDetail(item.houseId)"
      >
        <img :src="item.houseImg.split('&')[0]" alt="">
        <h4 class="title">{{ item.title }} · {{ item.area }}m²</h4>
        <div class="flex">
          <p class="area">{{ item.districtId }} / {{ item.desc }}</p>
          <p class="price">{{ item.rent }} 元/月</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqGetRecommend } from '@/api/info'
import useStore from '~/composables/store'

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

const userStore = useStore.user()
let houseList = ref([])
const refresh = async () => {
  const { userId } = userStore.userInfo
  let res = await reqGetRecommend(userId, props.num)
  if(res.code === 200) {
    houseList.value = res.data
  }
}

const toDetail = (id: number) => {
  navigate('/details', { 'houseId': id })
}

onMounted(() => {
  setTimeout(() => {
    refresh()
  }, 0)
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
      object-fit: cover;
    }
    .title {
      margin: 10px 0;
      font-size: 0.8em;
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