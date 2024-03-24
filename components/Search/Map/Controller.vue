<template>
  <div>
    <div class="controller flex">
      <div ref="locationRef" class="house-list">
        <div class="list">
          <p class="line" @click="handleShowLocation">杭州
            <el-icon :size="10"><CaretBottom /></el-icon>
          </p>
          <p>可视区域内为您找到 {{ props.pageInfo.total }} 套房子</p>
          <span class="show_btn" @click="handleShowHouseDetal">
            <el-icon :size="15" v-show="!showHouseDetal"><ArrowUp/></el-icon>
            <el-icon :size="15" v-show="showHouseDetal"><ArrowDown/></el-icon>
          </span>
        </div>
        <div class="house_detal list" v-show="showHouseDetal">
          <div v-infinite-scroll="load"
            class="infinite-list"
            style="overflow: auto"
            infinite-scroll-immediate
            :infinite-scroll-distance="10"
          >
            <div
              class="flex inf-item"
              v-for="item in props.pageInfo.data"
              :key="item.houseId"
              @click="toDetail(item.houseId)"
            >
              <img :src="item.houseImg.split('&')[0]" class="inf-img">
              <div class="inf-content">
                <h2 class="inf-title">{{ item.title }}</h2>
                <p class="inf-tip">{{ item.area }}m² | {{ item.desc }} | {{ item.direct }}</p>
                <p class="inf-price">{{ item.rent }} 元/月</p>
              </div>
            </div>
          </div>
        </div>
        <div class="location_detal list" v-show="showLocation">
            <div class="location_box">
              <p>热门城市</p>
              <ul>
                <li class="hot_city">北京</li>
                <li class="hot_city">上海</li>
                <li class="hot_city">广州</li>
                <li class="hot_city">深圳</li>
                <li class="hot_city">杭州</li>
                <li class="hot_city">成都</li>
              </ul>
            </div>
            <div v-for="item in city" :key="item.letter">
              <p class="letter">{{ item.letter }}</p>
              <div class="location_box">
                <div class="flex loacl-options" v-for="(local, index) in item.local" :key="index">
                  <p class="province">{{ local.province }} :</p>
                  <ul>
                    <li v-for="(val, index) in local.city" :key="index">{{ val }}</li>
                  </ul>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div class="filter" ref="filterRef">
        <div class="list">
          <p
            :class="['filter_item', {active_btn: activeFilter('price') || lastFilterType === 'price'}]"
            @click="handleShowFilterDetal('price')"
          >租金
            <el-icon :size="10"><CaretBottom /></el-icon>
          </p>
          <p
            :class="['filter_item', {active_btn: activeFilter('way') || lastFilterType === 'way'}]"
            @click="handleShowFilterDetal('way')"
          >方式
            <el-icon :size="10"><CaretBottom /></el-icon>
          </p>
          <p
            :class="['filter_item', {active_btn: activeFilter('type') || lastFilterType === 'type'}]"
            @click="handleShowFilterDetal('type')"
          >房型
            <el-icon :size="10"><CaretBottom /></el-icon>
          </p>
          <p
            :class="['filter_item', {active_btn: activeFilter('more') || lastFilterType === 'more'}]"
            @click="handleShowFilterDetal('more')"
          >更多
            <el-icon :size="10"><CaretBottom /></el-icon>
          </p>
          <p class="filter_item active_btn clear_btn"
            v-show="activeFilter('more') || activeFilter('price') || activeFilter('type') || activeFilter('way')"
            @click="clearAll"
          >清除筛选</p>
        </div>
        <div class="filter_detal" v-show="showFilterDetal">
          <div class="form">
            <div class="form_item" v-show="lastFilterType === 'price'">
              <div class="form_item" v-for="item in getFilter(['price'])" :key="item.titleEn">
                <p class="form_title">{{ item.title }}</p>
                <el-checkbox-group v-model="form.price">
                  <el-checkbox v-for="opt in item.options" :key="opt.id" :label="opt.id">{{ opt.label }}</el-checkbox>
                </el-checkbox-group>
                <div class="priceRange">
                  <el-input class="priceRange-input" v-model.number="form.priceRange.minn"/>
                  <span class="line">—</span>
                  <el-input class="priceRange-input" v-model.number="form.priceRange.maxn"/>
                  <span class="unit">元/月</span>
                </div>
              </div>
            </div>
            <div class="form_item" v-show="lastFilterType === 'way'">
              <ul>
                <li :class="[{li_active: form.way === ''}]" @click="form.way = ''">不限</li>
                <li :class="[{li_active: form.way === '00'}]" @click="form.way = '00'">整租</li>
                <li :class="[{li_active: form.way === '01'}]" @click="form.way = '01'">合租</li>
              </ul>
            </div>
            <div class="form_item" v-show="lastFilterType === 'type'">
              <div class="form_item" v-for="item in getFilter(['type'])" :key="item.titleEn">
                <p class="form_title">{{ item.title }}</p>
                <el-checkbox-group v-model="form.type">
                  <el-checkbox v-for="opt in item.options" :key="opt.id" :label="opt.id">{{ opt.label }}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div class="more_form" v-show="lastFilterType === 'more'">
              <el-scrollbar height="400px">
                <div
                  class="form_item"
                  v-for="item in getFilter(['toward','area', 'feature', 'tenancy', 'floor', 'elevator'])"
                  :key="item.titleEn"
                >
                  <p class="form_title">{{ item.title }}</p>
                  <el-checkbox-group v-model="form[item.titleEn]">
                    <el-checkbox v-for="opt in item.options" :key="opt.id" :label="opt.id">{{ opt.label }}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </el-scrollbar>
            </div>
          </div>
          <div class="btn_group flex">
            <div class="filter_btn reset_btn" @click="clearForm">重置</div>
            <div class="filter_btn" @click="closeForm">取消</div>
            <div class="filter_btn active_btn" @click="handleFilter">确定</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { filter } from '@/content/filter'
import city from '@/content/city.json'
import { filterItemType } from '@/types/search'

// 是否展示房屋
let showHouseDetal = ref<boolean>(false)
const handleShowHouseDetal = () => {
  if (showLocation.value){
    showLocation.value = false
  }
  showHouseDetal.value = !showHouseDetal.value
}

const props = defineProps(['pageInfo'])
const emits = defineEmits(['loadPageInfo', 'searchWithOptions'])

const form = ref({
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

defineExpose({
  form
})

// 无限滚动
const load = () => {
  emits('loadPageInfo')
}

// 是否显示定位
let showLocation = ref<boolean>(false)
const handleShowLocation = () => {
  if (showHouseDetal.value) {
    showHouseDetal.value = false
  }
  showLocation.value = !showLocation.value
}

// 是否展示筛选
let showFilterDetal = ref<boolean>(false)
let lastFilterType= ref<string>('')
const handleShowFilterDetal = (type: string) => {
  if(lastFilterType.value === '' || type === lastFilterType.value) {
    showFilterDetal.value = !showFilterDetal.value
  }
  if(showFilterDetal.value === false){
    lastFilterType.value = ''
  } else {
    lastFilterType.value = type
  }
}

// 清空当前表单
const clearForm = () => {
  if(lastFilterType.value === 'price'){
    form.value.price = []
    form.value.priceRange.minn = null
    form.value.priceRange.maxn = null
  } else if(lastFilterType.value === 'way'){
    form.value.way = ''
  } else if(lastFilterType.value === 'type'){
    form.value.type = []
  } else if(lastFilterType.value === 'more'){
    form.value.toward = []
    form.value.area = []
    form.value.feature = []
    form.value.tenancy = []
    form.value.floor = []
    form.value.elevator = []
  }
  emits('searchWithOptions')
}

// 关闭过滤表单
const closeForm = () => {
  showFilterDetal.value = false
  lastFilterType.value = ''
}

// 点击区域外关闭
const locationRef = ref<HTMLElement>()
const filterRef = ref<HTMLElement>()
const handleClickOutside = (e: MouseEvent) => {
  if(filterRef.value && !filterRef.value.contains(e.target as Node) && showFilterDetal.value){
    closeForm()
  }
  if(locationRef.value && !locationRef.value.contains(e.target as Node) && showLocation.value){
    showLocation.value = false
  }
}

// 提交筛选类型
const handleFilter = async () => {
  await emits('searchWithOptions')
  closeForm()
}

// 获取筛选项
const getFilter = (arr: string[]) => {
  let filters: filterItemType[] = []
  filter.forEach(item => {
    if(arr.includes(item.titleEn)) {
      filters.push(item)
    }
  })
  return filters
}

// 筛选按钮active状态
const activeFilter = computed(() => (type: 'price'|'way'|'type'|'more'): boolean => {
  if(type === 'price'){
    return form.value.price.length > 0
      || form.value.priceRange.maxn !== null || form.value.priceRange.minn != null
  } else if(type === 'way'){
    return form.value.way.length > 0
  } else if(type === 'type'){
    return form.value.type.length > 0
  } else if(type === 'more'){
    return form.value.toward.length > 0
      || form.value.area.length > 0
      || form.value.feature.length > 0
      || form.value.tenancy.length > 0
      || form.value.floor.length > 0
      || form.value.elevator.length > 0
  }
  return false
})

// 清除筛选
const clearAll = () => {
  form.value = {
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
  }
  emits('searchWithOptions')
}

const toDetail = (id: number) => {
  navigate('/details', { 'houseId': id })
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="scss" scoped>
.controller{
  position: absolute;
  align-items: stretch;
  top: 20px;
  left: 20px;
  .list {
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 375px;
    height: 30px;
    background-color: #ffffff;
    border-radius: 5px;
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
    .clear_btn {
      height: 30px;
      position: absolute;
      right: -80px;
      top: 0px;
      background-color: #ffffff;
      border-radius: 5px;
      padding: 14px 20px 6px 0;
      vertical-align: bottom;
    }
  }
  .house_detal {
    height: 450px;
    margin-top: 10px;
    .infinite-list {
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
      list-style: none;
      .inf-item {
        padding: 10px;
        .inf-img {
          width: 120px;
          height: 80px;
          object-fit: cover;
        }
        .inf-content {
          margin-left: 10px;
          .inf-title {
            width: 220px;
            height: 45px;
            font-size: 16px;
          }
          .inf-tip {
            color: $grayText;
            font-size: 14px;
          }
          .inf-price {
            color: red;
          }
        }
      }
    }
  }
  .location_detal {
    display: block;
    width: 390px;
    height: 450px;
    margin-top: 10px;
    padding: 0;
    font-size: 14px;
    background-color: #eeeeee;
    overflow: auto;
    .location_box {
      width: 365px;
      padding: 5px 10px;
      background-color: #ffffff;
      p {
        margin: 5px 10px 5px 0;
        min-width: 45px;
      }
      li {
        margin: 10px;
      }
      .hot_city {
        margin: 10px 20px 10px 0;
      }
      .province {
        margin-top: 10px;
      }
      .loacl-options {
        align-items: stretch;
        margin-bottom: 10px;
      }
    }
    .letter {
      margin: 0 10px;
      font-size: 14px;
    }
  }
  .filter {
    position: relative;
    left: 50px;
  }
  .filter_detal {
    position: relative;
    width: 420px;
    margin-top: 10px;
    padding: 10px 0 10px 40px;
    background-color: #ffffff;
    border-radius: 5px;
    .form_item {
      .form_title {
        font-weight: bold;
        margin: 5px 0 15px 0;
      }
      .priceRange {
        position: static;
        margin-top: 20px;
        padding-top: 10px;
        border-top: 1px solid #eeeeee;
      }
    }
    .btn_group {
      padding: 15px 0;
      margin-top: 5px;
      .filter_btn {
        cursor: pointer;
      }
      .filter_btn + .filter_btn {
        margin-left: 40px;
      }
      .reset_btn {
        margin-right: 200px;
      }
    }
  }
}
li {
  margin: 20px 20px 10px 0;
}
.li_active {
  color: $primary;
}
</style>