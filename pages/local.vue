<template>
  <div class="container">
    <h1>国内城市</h1>
    <div class="search-box">
      <el-input class="search" size="large">
        <template #prepend>
          <el-icon class="search-icon" :size="20">
            <Search/>
          </el-icon>
        </template>
        <template #append>
          <div class="search-btn btn">
            搜索城市
          </div>
        </template>
      </el-input>
    </div>
    <div class="flex">
      <h4 class="title">热门城市</h4>
      <a>北京</a>
      <a>上海</a>
      <a>广州</a>
      <a>深圳</a>
      <a>杭州</a>
      <a>成都</a>
    </div>
    <div class="flex">
      <h4 class="title">城市选择</h4>
      <client-only>
        <el-select v-model="value" class="select" placeholder="Select" size="large">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="value" class="select" placeholder="Select" size="large">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </client-only>
    </div>
    <div class="alphabetically">
      <h4 class="title">按照省份首字母选择</h4>
      <LocalAlphabetically />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
definePageMeta({
  title: 'Local'
})
const value = ref('')

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 30px;
  font-size: 24px;
}
.search-box {
  width: 780px;
  height: 60px;
  margin-bottom: 40px;
  .search {
    border-radius: 5px;
    font-size: 16px;
    .search-icon {
      margin-left: 18px;
    }
    .search-btn {
      width: 100px;
      height: 45px;
      margin-right: 5px;
      line-height: 45px;
      border-radius: 5px;
      border: none;
      color: #ffffff;
      background-color: $primary;
    }
  }
}
.flex {
  width: 640px;
  margin-top: 20px;
  .title {
    width: 100px;
    font-size: 16px;
  }
  a {
    margin-right: 15px;
  }
  .select {
    margin-right: 20px;
  }
}
.alphabetically {
  width: 1300px;
  margin-top: 50px;
}
</style>