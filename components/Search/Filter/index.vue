<template>
  <div class="filter">
    <el-form :model="form" label-position="left" label-width="60px" @submit.prevent>
      <el-form-item class="form_location" label="区域">
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
      <el-form-item v-for="(val, index) in filter" :key="index" v-show="val.show || showMore" :label="val.title">
        <el-checkbox-group :v-model="`form[${val.titleEn}]`">
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
  width: 1320px;
  margin: 0px 0 20px 0;
  border-bottom: 1px solid $gray;
  .district{
    width: 100%;
  }
  li {
    margin-right: 20px;
  }
  .li_active {
    color: $primary;
  }
  .more {
    width: 50px;
    position: absolute;
    bottom: -10px;
    left: 635px;
    text-align: center;
    background-color: #ffffff;
    cursor: pointer;
  }
}
</style>