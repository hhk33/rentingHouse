<template>
  <div class="container">
    <div class="search-box">
      <el-input class="search" size="large" placeholder="请输入区域、商圈或小区名进行找房">
        <template #append>
          <el-icon class="search-icon" :size="20">
            <Search/>
          </el-icon>
        </template>
      </el-input>
    </div>
    <div>
      <el-tabs class="demo-tabs" v-model="activeName">
        <el-tab-pane label="筛选搜索" name="filter">
          <SearchFilter/>
          <div class="house-list">
            <SearchHouseItem v-for="item in 8" :key="item" @click="navigate('/details')"/>
            <el-pagination
              class="pagination"
              layout="prev, pager, next"
              :total="40"
              :page-size="8"
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
const route = useRoute()
console.log(route.query)

const activeName = ref('filter')

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