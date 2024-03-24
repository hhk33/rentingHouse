<template>
  <div class="collect">
    <h1 class="title">共收藏 {{ total }} 套房源</h1>
    <div class="house-list flex">
      <div class="house-info" v-for="item in collectList" :key="item" @click="toDetail(item.houseId)">
        <img :src="item.houseImg.split('&')[0]" alt="">
        <h1 class="house-title">{{ item.title }}</h1>
        <p class="area gray">{{ item.desc }} | {{ item.area }}㎡ | {{ item.direct }} </p>
        <p class="red">{{ item.rent }} 元/月</p>
        <el-icon
          v-show="!item.isCollect"
          class="star"
          size="20"
          @click.stop.prevent="handleCollectHouse(item.houseId, true)"
        >
          <Star />
        </el-icon>
        <el-icon
          v-show="item.isCollect"
          class="star"
          size="20"
          color="#ffd700"
          @click.stop.prevent="handleCollectHouse(item.houseId, false)"
        >
          <StarFilled/>
        </el-icon>
      </div>
    </div>
    <el-pagination
      class="pagination"
      layout="prev, pager, next"
      v-model:current-page="pageNum"
      :total="total"
      :page-size="pageSize"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { reqGetAllCollect, reqCollectHouse } from "@/api/user"

let pageNum = ref(1)
let pageSize = ref(6)
let total = ref(0)
let collectList = ref([])

const toDetail = (id: number) => {
  navigate('/details', {
    houseId: id
  })
}

const getCollectList = async () => {
  let res = await reqGetAllCollect(pageNum.value, pageSize.value)
  if (res.code === 200) {
    collectList.value = res.data.data
    total.value = res.data.total
    collectList.value.forEach(item => {
      item.isCollect = true
    })
  }
}

const handleCollectHouse = async (houseId, flag) => {
  let res = await reqCollectHouse(houseId)
  if (res.code !== 200) {
    ElMessage.error('收藏失败')
  } else {
    collectList.value.forEach(item => {
      if (item.houseId === houseId) {
        item.isCollect = flag
      }
    })
  }
}

const handlePageChange = () => {
  getCollectList()
}

onMounted(() => {
  setTimeout(() => {
    getCollectList()
  }, 0)
})
</script>

<style lang="scss" scoped>
.collect {
  padding: 20px;
  box-sizing: border-box;
  .title {
    margin: 0 0 0 40px;
    font-size: 22px;
    color: $textColor;
  }
  .house-list {
    width: 1070px;
    margin-top: 6px;
    box-sizing: border-box;
    flex-wrap: wrap;
    justify-content: center;
    .house-info {
      width: 280px;
      padding: 10px;
      margin: 14px 20px;
      box-shadow: 0 0 4px #cacaca;
      border-radius: 5px;
      img {
        width: 100%;
        height: 100px;
        object-fit: cover;
      }
      .house-title {
        font-size: 18px;
        color: $textColor;
      }
      .area {
        margin:4px 0 5px 0;
        font-size: 14px;
      }
      .star {
        margin: -40px 10px 0 0;
        float: right;
      }
    }
  }
  .pagination {
      float: right;
      margin: 10px 40px 10px 0;
    }
}
</style>