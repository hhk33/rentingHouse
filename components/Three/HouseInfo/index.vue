<template>
  <div>
    <div class="info flex">
      <p class="back">
        <el-icon :size="24" @click="toDetail"><Back/></el-icon>
      </p>
      <p class="info-title" @click="showDetail = !showDetail">
        {{ houseRec.title }}  {{ houseRec.area }}㎡
        <el-icon v-show="!showDetail"><ArrowDown /></el-icon>
        <el-icon v-show="showDetail"><ArrowUp /></el-icon>
      </p>
    </div>
    <div class="details" v-show="showDetail">
      <p class="details-title">房源信息</p>
      <div class="flex item-list">
        <div class="item">
          <p class="item-title">
            <el-icon style="margin-right: 5px;" color="#999999"><Coin /></el-icon>
            租金
          </p>
          <p class="item-info">{{ houseRec.rent }} 元/月</p>
        </div>
        <div class="item">
          <p class="item-title">
            <el-icon style="margin-right: 5px;" color="#999999"><Calendar /></el-icon>
            付款方式
          </p>
          <p class="item-info">{{ rentUnitList[houseRec.rentUnit] }}</p>
        </div>
        <div class="item">
          <p class="item-title">
            <el-icon  style="margin-right: 5px;" color="#999999"><House /></el-icon>
            户型
          </p>
          <p class="item-info">{{ houseRec.desc }}</p>
        </div>
        <div class="item">
          <p class="item-title">
            <el-icon style="margin-right: 5px;" color="#999999"><Position /></el-icon>
            朝向
          </p>
          <p class="item-info">{{ houseRec.direct }}</p>
        </div>
        <div class="item">
          <p class="item-title">
            <el-icon style="margin-right: 5px;" color="#999999"><OfficeBuilding /></el-icon>
            楼层
          </p>
          <p class="item-info">{{ houseRec.floor }}层/{{ houseRec.totalFloor }}层</p>
        </div>
        <div class="item">
          <p class="item-title">
            <el-icon style="margin-right: 5px;" color="#999999"><School /></el-icon>
            电梯
          </p>
          <p class="item-info">{{ houseRec.elevator === '00' ? '无电梯' : '有电梯' }}</p>
        </div>
        <div class="item">
          <p class="item-title">
            <el-icon style="margin-right: 5px;" color="#999999"><Location /></el-icon>
            地址
          </p>
          <p class="item-info">
            {{ houseRec.provinceId + houseRec.cityId + houseRec.districtId + houseRec.village }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

let showDetail = ref(false)

const props = defineProps(['houseRec'])
let houseRec = ref(props.houseRec)

const route = useRoute()
const toDetail = () => {
  navigate('/details',
    { houseId: route.query.houseId },
  )
}

const rentUnitList = {
  '00': '月付',
  '01': '季付',
  '02': '年付'
}
</script>

<style lang="scss" scoped>
.info {
  width: auto;
  height: 36px;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #ffffff88;
  .back {
    height: 20px;
    padding: 0px 10px 2px 10px;
    border-right: 1px solid $gray;
    cursor: pointer;
  }
  .info-title {
    margin: 0 10px;
    cursor: pointer;
  }
}
.details {
  position: absolute;
  width: 400px;
  height: 40vh;
  margin-top: 10px;
  padding: 20px 40px;
  border-radius: 4px;
  background-color: #ffffff88;
  .details-title {
    margin-bottom: 20px;
    font-weight: bold;
  }
  .details-title::after {
    content: '';
    position: absolute;
    display: block;
    top: 24px;
    left: 28px;
    width: 4px;
    height: 16px;
    background-color: rgba(58,126,255,.9);
  }
}
.item-list {
  flex-wrap: wrap;
  .item {
    margin-bottom: 15px;
    .item-title, .item-info {
      min-width: 200px;
      font-size: 14px;
    }
    .item-title {
      color: $gray;
    }
  }
}
</style>