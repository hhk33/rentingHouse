<template>
  <div>
    <div class="controller flex">
        <div class="house-list">
          <div class="list">
            <p class="line">杭州
              <el-icon :size="10"><CaretBottom /></el-icon>
            </p>
            <p>可视区域内为您找到11346套房子</p>
            <span class="show_btn" @click="handleShowHouseDetal">
              <el-icon :size="15" v-show="!showHouseDetal"><ArrowUp/></el-icon>
              <el-icon :size="15" v-show="showHouseDetal"><ArrowDown/></el-icon>
            </span>
          </div>
        <div class="house_detal list" v-show="showHouseDetal">
        </div>
      </div>
      <div class="filter">
        <div class="list">
          <p class="filter_item" @click="handleShowFilterDetal('price')">租金
            <el-icon :size="10"><CaretBottom /></el-icon>
          </p>
          <p class="filter_item" @click="handleShowFilterDetal('way')">方式
            <el-icon :size="10"><CaretBottom /></el-icon>
          </p>
          <p class="filter_item" @click="handleShowFilterDetal('type')">房型
            <el-icon :size="10"><CaretBottom /></el-icon>
          </p>
          <p class="filter_item" @click="handleShowFilterDetal('more')">更多
            <el-icon :size="10"><CaretBottom /></el-icon>
          </p>
        </div>
        <div class="filter_detal list" v-show="showFilterDetal"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let showHouseDetal = ref<boolean>(false)
const handleShowHouseDetal = () => {
  showHouseDetal.value = !showHouseDetal.value
}
let showFilterDetal = ref<boolean>(false)
let lastFilterType: string = ''
const handleShowFilterDetal = (type: string) => {
  if(lastFilterType === '' || type === lastFilterType) {
    showFilterDetal.value = !showFilterDetal.value
  }

  if(showFilterDetal.value === false){
    lastFilterType = ''
  } else {
    lastFilterType = type
  }
}
</script>

<style lang="scss" scoped>
.controller{
  position: absolute;
  align-items: stretch;
  top: 20px;
  left: 20px;
  .list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 375px;
    height: 30px;
    background-color: #ffffff;
    border-radius: 5px;
    margin-right: 50px;
    padding: 10px;
    .line {
      width: 60px;
      border-right: 1px solid $gray;
      cursor: pointer;
    }
    .show_btn {
      cursor: pointer;
    }
    .filter_item {
      flex: 1;
      text-align: center;
      cursor: pointer;
    }
  }
  .house_detal {
    height: 450px;
    margin-top: 10px;
  }
  .filter_detal {
    width: 500px;
    height: 450px;
    margin-top: 10px;
  }
}
</style>