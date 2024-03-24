<template>
  <div class="flex house-item">
    <img :src="houseData.houseImg.split('&')[0]" alt="">
    <div class="info">
      <h4 class="title">{{ houseData.title }}</h4>
      <p class="desc">
        {{ houseData.cityId }}-{{ houseData.districtId }}-{{ houseData.village }} /
         {{ houseData.area }}㎡ /{{ houseData.direct }} / {{ houseData.desc }}
      </p>
      <div class="tags flex">
        <p class="tag" v-show="isNewHouse(houseData.updateTime)">新上</p>
        <p class="tag" v-show="houseData.decorationStatus === '02'">精装</p>
        <p class="tag" v-show="houseData.rentingType === '02'">公寓</p>
        <p class="tag" v-show="houseData.elevator === '01'">有电梯</p>
        <p class="tag" v-show="houseData.floor > 0">{{ floor }}</p>
        <p class="tag" v-show="houseData.rentUnit === '00'">月付</p>
        <p class="tag" v-show="houseData.vr === '01'">VR看房</p>
      </div>
      <p class="source">
        <el-icon><AlarmClock /></el-icon>
        维护时间：{{ houseData.maintenanceTime }}
      </p>
    </div>
    <p class="price">{{ houseData.rent }} 元/月</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

let props = defineProps(['houseData'])
const { houseData } = props

const floor = computed(() => {
  const num = houseData.floor / houseData.totalFloor
  if (num < 1/3) {
    return '低楼层'
  } else if (num >= 1/3 && num < 2/3) {
    return '中楼层'
  } else {
    return '高楼层'
  }
})

const isNewHouse = date => {
  const inputDate = new Date(date.replace(/-/g, '/'))
  const currentDate = new Date()
  currentDate.setMonth(currentDate.getMonth() - 2)
  return inputDate > currentDate
}
</script>

<style lang="scss" scoped>
  .house-item {
    width: 100%;
    height: 180px;
    margin: 10px;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 10px;
    
    img {
      width: 180px;
      height: 140px;
      border-radius: 10px;
      box-shadow: 0 0 4px 0 #cacaca;
    }

    .info {
      flex: 1;
      margin-left: 20px;
      .title {
        margin: 10px 0;
        font-size: 20px;
      }

      .desc {
        font-size: 14px;
        color: $gray;
        font-weight: bold;
      }

      .tags {
        height: 40px;
        line-height: 40px;
        margin: 10px 0 5px 0;

        .tag {
          display: inline-block;
          height: 30px;
          line-height: 30px;
          padding: 0 16px;
          margin-right: 20px;
          text-align: center;
          border-radius: 30px;
          background-color: $btnActive;
          color: $primary;
          font-size: 14px;
        }
      }

      .source {
        color: $gray;
        font-size: 14px;
      }
    }

    .price {
      margin-top: -80px;
      font-size: 20px;
      font-weight: bold;
      color: red;
    }
  }
</style>