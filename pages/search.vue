<template>
  <div class="container">
    <div class="search-box">
      <el-input
        v-model="keyword"
        class="search"
        size="large"
        placeholder="请输入区域、商圈或小区名进行找房"
        @keyup.enter="handleSearch"
      >
        <template #append>
          <el-icon class="search-icon" :size="20" @click="handleSearch">
            <Search/>
          </el-icon>
        </template>
      </el-input>
    </div>
    <div>
      <el-tabs class="demo-tabs" v-model="activeName">
        <el-tab-pane label="筛选搜索" name="filter">
          <SearchFilter ref="filterRef"/>
          <div class="house-list">
            <SearchHouseItem v-for="item in houseList" :houseData="item" :key="item.houseId" @click="toDetail(item.houseId)"/>
            <el-pagination
              class="pagination"
              layout="prev, pager, next"
              :total="total"
              :current-page="pageNum"
              :page-size="pageSize"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="地图搜索" name="map">
          <LazySearchMap/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { reqSearchHouse, reqSearch } from '@/api/search'

const route = useRoute()
const activeName = ref('filter')

let pageNum = ref(1)
let pageSize = ref(8)

const toDetail = (id: number) => {
  navigate('/details', { 'houseId': id })
}

let total = ref(0)
let houseList = ref<any>([])
const searchHouse = async () => {
  let res: any = await reqSearchHouse(keyword.value, pageNum.value, pageSize.value)
  if (res.code === 200) {
    houseList.value = res.data.data
    total.value = res.data.total
  }
}

let keyword = ref(route.query.search)
const filterRef = ref()
const handleSearch = async () => {
  const params = {}
  for (let option in filterRef.value.form) {
    const obj = filterRef.value.form[option]
    if ( typeof obj === 'object'&& obj !== null && Array.isArray(obj) ) {
      params[option] = filterRef.value.form[option].join(',')
    }
    else {
      params[option] = filterRef.value.form[option]
    }
  }
  params['keyword'] = keyword.value
  params['priceMin'] = filterRef.value.form.priceRange.minn
  params['priceMax'] = filterRef.value.form.priceRange.maxn
  params['pageNum'] = pageNum.value
  params['pageSize'] = pageSize.value
  let res = await reqSearch(params)
  if (res.code === 200) {
    houseList.value = res.data.data
    total.value = res.data.total
  }
}

watch(() => route.query.search, newVal => {
  pageNum.value = 1
  keyword.value = newVal
  searchHouse()
})

const handleSizeChange = () => {}
const handleCurrentChange = (page: number) => {
  pageNum.value = page
  searchHouse()
}

onMounted(() => {
  setTimeout(() => {
    searchHouse()
  }, 0)
})

</script>

<style lang="scss" scoped>
.container {
  padding-right: $headerLeft;
  width: 1320px;
}
.search-box {
  width: 780px;
  height: 60px;
  margin-bottom: 10px;
  .search {
    border-radius: 5px;
    font-size: 14px;
    .search-icon {
      margin-right: 18px;
      cursor: pointer;
    }
  }
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs {
  .house-list {
    width: 1000px;
    margin-bottom: 50px;
    .pagination {
      position: absolute;
      bottom: 30px;
      right: 540px;
    }
  }
}
</style>