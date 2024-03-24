<template>
  <div class="filter">
    <el-form :model="form" label-position="left" label-width="auto" @submit.prevent>
      <el-form-item class="form_location" label="区域">
        <div class="district">
          <ul>
            <li :class="[{li_active: form.district === ''}]" @click="form.district = ''">不限</li>
            <li
              v-for="item in districtList"
              :key="item.cityId"
              :class="[{li_active: form.district === item.cityId}]"
              @click="form.district = item.cityId"
            >
              {{ item.cityName }}
            </li>
          </ul>
        </div>
      </el-form-item>
      <el-form-item class="form_location" label="方式">
        <div class="district">
          <ul>
            <li :class="[{li_active: form.way === ''}]" @click="form.way = ''">不限</li>
            <li :class="[{li_active: form.way === '00'}]" @click="form.way = '00'">整租</li>
            <li :class="[{li_active: form.way === '01'}]" @click="form.way = '01'">合租</li>
          </ul>
        </div>
      </el-form-item>
      <el-form-item v-for="(val, index) in filter" :key="index" v-show="val.show || showMore" :label="val.title">
        <el-checkbox-group v-model="form[val.titleEn]">
          <el-checkbox v-for="item in val.options" :key="item.id" :label="item.id" >
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <div class="priceRange">
        <el-input class="priceRange-input" v-model.number="form.priceRange.minn"/>
        <span class="line">—</span>
        <el-input class="priceRange-input" v-model.number="form.priceRange.maxn"/>
        <span class="unit">元/月</span>
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
import { ref, onMounted } from 'vue'
import { filter } from '@/content/filter'
import { reqGetDistrict } from '@/api/info'

// 筛选表单数据
const form = ref({
  district: '',
  way: '',
  price: [],
  priceRange: {
    minn: null,
    maxn: null
  },
  type: [],
  toward: [],
  area: [],
  feature: [],
  tenancy: [],
  floor: [],
  elevator: []
})

let showMore = ref<boolean>(false)
const changeShowMore = () => {
  showMore.value = !showMore.value
}

let districtList = ref([])
const getDistrict = async () => {
  let res = await reqGetDistrict()
  if (res.code === 200) {
    districtList.value = res.data
  }
}

defineExpose({
  form
})

onMounted(() => {
  setTimeout(() => {
    getDistrict()
  }, 0)
})
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