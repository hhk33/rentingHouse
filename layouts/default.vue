<template>
  <div>
    <div class="header header-shadow" :style="{background: `rgba(255, 255, 255, ${opacity})`}">
      <img src="@/assets/img/logo.png" @click="navigate('/')">
      <div class="list">
        <div class="search" v-show="opacity === 1">
          <el-input :prefix-icon="Search" />
        </div>
        <div class="details flex">
          <div class="btn">我要租房</div>
          <div class="btn" @click="navigate('/proprietor')">我要出租</div>
          <div class="btn">联系我们</div>
          <div class="login flex">
            <div class="btn active" @click="setDialogVisible(true)">登录</div>
            <!-- <el-avatar :size="28" :src="circleUrl" />
            <span class="username">137****0000</span> -->
          </div>
        </div>
        <div class="operation">
          <el-dropdown>
            <el-icon :size="28"><Operation /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>我要租房</el-dropdown-item>
                <el-dropdown-item>我要出租</el-dropdown-item>
                <el-dropdown-item>联系我们</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <slot />
    <Login />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Search } from '@element-plus/icons-vue'
import useStore from '@/composables/store'

const userStore = useStore.user()
const { setDialogVisible } = userStore

const route = useRoute()
// const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
const opacity = ref(0.2)
// 根据页面滚动，改变顶部导航栏透明度
const handleScroll = () => {
  if (route.path !== '/'){
    opacity.value = 1
    return
  }
  const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
  if (scrollTop > 80) {
    let num = 1 - (400 - scrollTop) / 400
    opacity.value = num >= 1 ? 1 : num
  } else {
    opacity.value = 0.2
  }
}
// 监听路由变化，改变导航栏样式
watch(() => route.path, () =>{
  if (route.path !== '/'){
    opacity.value = 1
  }
}, { immediate: true })

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  width: 100%;
  height: $headerHigh;
  display: flex;
  align-items: center;
  justify-content:space-between;
  background-color: rgba($color: #ffffff, $alpha: 0.2);
  z-index: 99;
  img {
    width: 80px;
    margin: 5px 50px 0 $headerLeft;
    cursor: pointer;
  }
  .list {
    display: flex;
    align-items: center;
    .search {
      width: 25vw;
      height: 30px;
      background-color: transparent;
    }
    .login {
      width: 130px;
      margin: 0 40px;
      .btn {
        width: 75px;
        height: 40px;
        line-height: 40px;
        border: 40px;
      }
      .username {
        margin-left: 10px;
      }
    }
    .operation {
      margin: 0 40px;
    }
  }
}
.header-shadow {
  box-shadow: 0px 0px 5px $gray;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.details {
  display: flex;
}
.operation {
  display: none;
}

// @media screen and (min-width: 824px){
//   .details {
//     display: flex;
//   }
//   .operation {
//     display: none;
//   }
// }

// @media screen and (max-width: 824px) {
//   .details {
//     display: none;
//   }
//   .operation {
//     display: block;
//   }
// }
</style>