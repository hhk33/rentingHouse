<template>
  <div class="filter">
    <el-form :model="form" label-position="left" label-width="60px" @submit.prevent>
      <el-form-item label="区域">
        <div class="district">
          <ul>
            <li :class="[{li_active: form.address.district === 0}]" @click="form.address.district = 0">不限</li>
            <li
              v-for="item in 8"
              :key="item"
              :class="[{li_active: form.address.district === item}]"
              @click="form.address.district = item"
            >
              district{{ item }}
            </li>
          </ul>
        </div>
        <div class="location" v-show="form.address.district !== 0">
          <ul>
            <li :class="[{li_active: form.address.location === 0}]" @click="form.address.location = 0">不限</li>
            <li
              v-for="item in 5"
              :key="item"
              :class="[{li_active: form.address.location === item}]"
              @click="form.address.location = item"
            >
              location{{ form.address.district }}-{{ item }}
            </li>
          </ul>
        </div>
      </el-form-item>
      <el-form-item v-for="(val, key) in filter" :key="key" v-show="val.show || showMore" :label="val.title">
        <el-checkbox-group :v-model="`form[${key}]`">
          <el-checkbox v-for="item in val.options" :key="item.id" :label="item.label" />
        </el-checkbox-group>
      </el-form-item>
      <div class="priceRange">
        <el-input class="priceRange-input" v-model.number="form.priceRange.minn"/>
        <span class="line">—</span>
        <el-input class="priceRange-input" v-model.number="form.priceRange.maxn"/>
        <span class="unit">元/月</span>
        <div class="btn">确定</div>
      </div>
    </el-form>
    <div class="more" @click="changeShowMore">
      {{ showMore? '收起' : '更多' }}
      <el-icon v-show="!showMore" :size="10"><ArrowDown /></el-icon>
      <el-icon v-show="showMore" :size="10"><ArrowUp /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { filter } from '@/content/filter'
// 筛选表单数据
const form = reactive({
  address: {
    district: 0,
    location: 0
  },
  way: [],
  price: [],
  priceRange: {
    minn: null,
    maxn: null
  },
  type: [],
  toward: [],
  arae: [],
  feature: [],
  tenancy: [],
  floor: [],
  elevator: []
})

let showMore = ref<boolean>(false)
const changeShowMore = () => {
  showMore.value = !showMore.value
}
</script>

<style lang="scss" scoped>
.filter {
  position: relative;
  width: 900px;
  margin: 20px 0;
  border-bottom: 1px solid $gray;
  li {
    margin-right: 20px;
  }
  .li_active {
    color: $primary;
  }
  .priceRange {
    position: absolute;
    vertical-align: bottom;
    .priceRange-input {
      width: 70px;
      margin-top: 10px;
    }
    .line {
      position: relative;
      top: 5px;
      margin: 0 5px;
    }
    .unit {
      position: relative;
      top: 15px;
      margin-left: 5px;
      font-size: 12px;
    }
    .btn {
      display: inline-block;
      width: 40px;
      height: 20px;
      line-height: 20px;
      position: relative;
      top: 10px;
      margin-left: 20px;
      border: none;
    }
  }
  .more {
    width: 50px;
    position: absolute;
    bottom: -10px;
    left: 400px;
    text-align: center;
    background-color: #ffffff;
  }
}
</style>